(function () {
  "use strict";

  var STORAGE_KEY = "nexmed_cart";

  function money(n) {
    return "$" + Math.round(n).toLocaleString("es-CL");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function readRawCart() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeRawCart(items) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
    document.dispatchEvent(new CustomEvent("nexmed:cart-updated"));
  }

  function getProduct(codigo) {
    var list = window.NEXMED_PRODUCTS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].codigo === codigo) return list[i];
    }
    return null;
  }

  function findRawItem(items, codigo) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].codigo === codigo) return items[i];
    }
    return null;
  }

  function addItem(codigo, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    if (!getProduct(codigo)) return;
    var items = readRawCart();
    var found = findRawItem(items, codigo);
    if (found) {
      found.cantidad += qty;
    } else {
      items.push({ codigo: codigo, cantidad: qty });
    }
    writeRawCart(items);
    document.dispatchEvent(new CustomEvent("nexmed:cart-item-added"));
  }

  function removeItem(codigo) {
    writeRawCart(readRawCart().filter(function (it) { return it.codigo !== codigo; }));
  }

  function setQty(codigo, qty) {
    qty = parseInt(qty, 10) || 0;
    if (qty <= 0) {
      removeItem(codigo);
      return;
    }
    var items = readRawCart();
    var found = findRawItem(items, codigo);
    if (!found) return;
    found.cantidad = qty;
    writeRawCart(items);
  }

  function clearCart() {
    writeRawCart([]);
  }

  function getItems() {
    return readRawCart()
      .map(function (it) {
        var p = getProduct(it.codigo);
        if (!p) return null;
        return {
          codigo: p.codigo,
          nombre: p.nombre,
          precio: p.precio,
          imagen: p.imagen,
          cantidad: it.cantidad,
          subtotal: p.precio * it.cantidad,
        };
      })
      .filter(Boolean);
  }

  function getSubtotal() {
    return getItems().reduce(function (sum, it) { return sum + it.subtotal; }, 0);
  }

  function getCount() {
    return readRawCart().reduce(function (sum, it) { return sum + it.cantidad; }, 0);
  }

  window.NEXMED_CART = {
    addItem: addItem,
    removeItem: removeItem,
    setQty: setQty,
    clearCart: clearCart,
    getItems: getItems,
    getSubtotal: getSubtotal,
    getCount: getCount,
  };

  // --- Insignia del carrito en el header ---

  function updateBadge() {
    var badge = document.getElementById("header-cart-badge");
    var button = document.getElementById("header-cart-button");
    var count = getCount();
    if (badge) {
      badge.textContent = String(count);
      badge.hidden = count === 0;
    }
    if (button) {
      button.setAttribute("aria-label", count === 0 ? "Carrito, vacío" : "Carrito, " + count + " producto" + (count === 1 ? "" : "s"));
    }
  }

  // --- Drawer lateral ---

  function cartItemHTML(item) {
    var imgTag = item.imagen
      ? '<img src="' + item.imagen + '" alt="' + escapeHtml(item.nombre) + '" loading="lazy" onerror="this.style.display=\'none\'" />'
      : "";
    return (
      '<div class="cart-item" data-codigo="' + escapeHtml(item.codigo) + '">' +
        '<span class="cart-item__image">' + imgTag + "</span>" +
        '<div class="cart-item__info">' +
          '<span class="cart-item__name">' + escapeHtml(item.nombre) + "</span>" +
          '<span class="cart-item__price">' + money(item.precio) + "</span>" +
          '<div class="cart-item__row">' +
            '<span class="cart-item__qty">' +
              '<button type="button" class="cart-item__qty-minus" aria-label="Restar cantidad">−</button>' +
              '<span>' + item.cantidad + "</span>" +
              '<button type="button" class="cart-item__qty-plus" aria-label="Sumar cantidad">+</button>' +
            "</span>" +
            '<button type="button" class="cart-item__remove">Eliminar</button>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function crossSellHTML() {
    var cartCodigos = readRawCart().map(function (it) { return it.codigo; });
    var candidates = (window.NEXMED_PRODUCTS || []).filter(function (p) {
      return cartCodigos.indexOf(p.codigo) === -1;
    });
    var picks = candidates.slice(0, 2);
    if (!picks.length) return "";
    return (
      '<div class="cart-drawer__cross-sell">' +
        '<p class="cart-drawer__cross-sell-heading">También te puede interesar</p>' +
        picks
          .map(function (p) {
            var imgTag = p.imagen
              ? '<img src="' + p.imagen + '" alt="" loading="lazy" onerror="this.style.display=\'none\'" />'
              : "";
            return (
              '<div class="about-list-item">' +
                '<span class="about-list-item__thumb">' + imgTag + "</span>" +
                '<span class="about-list-item__info">' +
                  '<a href="ficha-producto.html?codigo=' + encodeURIComponent(p.codigo) + '" class="about-list-item__name">' + escapeHtml(p.nombre) + "</a>" +
                  '<span class="about-list-item__price">' + money(p.precio) + "</span>" +
                "</span>" +
                '<button type="button" class="about-list-item__cart" aria-label="Agregar ' + escapeHtml(p.nombre) + ' al carrito">' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>' +
                "</button>" +
              "</div>"
            );
          })
          .join("") +
      "</div>"
    );
  }

  function renderDrawer() {
    var body = document.getElementById("cart-drawer-body");
    var footer = document.getElementById("cart-drawer-footer");
    var subtotalEl = document.getElementById("cart-drawer-subtotal");
    if (!body) return;

    var items = getItems();

    if (!items.length) {
      body.innerHTML =
        '<div class="cart-drawer__empty">' +
          '<p class="cart-drawer__empty-text">Tu carrito está vacío.</p>' +
          '<a href="tienda.html" class="pdp-actions__primary" style="display:inline-flex;flex:none;min-width:0;width:auto;">Ir a la tienda</a>' +
        "</div>";
      if (footer) footer.hidden = true;
      return;
    }

    body.innerHTML =
      '<div class="cart-drawer__list">' + items.map(cartItemHTML).join("") + "</div>" + crossSellHTML();

    if (footer) {
      footer.hidden = false;
      if (subtotalEl) subtotalEl.textContent = money(getSubtotal());
    }
  }

  // --- Apertura / cierre del drawer ---

  var drawerOpen = false;

  function openDrawer() {
    var overlay = document.getElementById("cart-drawer-overlay");
    var drawer = document.getElementById("cart-drawer");
    if (!overlay || !drawer) return;
    overlay.hidden = false;
    drawer.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    drawer.classList.remove("animate-search-panel-in");
    void drawer.offsetWidth;
    drawer.classList.add("animate-search-panel-in");
    document.documentElement.classList.add("cart-drawer-open-lock");
    drawerOpen = true;
    var closeBtn = document.getElementById("cart-drawer-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    var overlay = document.getElementById("cart-drawer-overlay");
    var drawer = document.getElementById("cart-drawer");
    if (!overlay || !drawer) return;
    overlay.hidden = true;
    drawer.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("cart-drawer-open-lock");
    drawerOpen = false;
    var toggle = document.getElementById("header-cart-button");
    if (toggle) toggle.focus();
  }

  function initDrawerToggle() {
    var toggle = document.getElementById("header-cart-button");
    var closeBtn = document.getElementById("cart-drawer-close");
    var overlay = document.getElementById("cart-drawer-overlay");

    if (toggle) {
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        openDrawer();
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drawerOpen) closeDrawer();
    });
  }

  // --- Delegación: cualquier botón "Agregar al carrito" del sitio ---

  function extractCodigoFromContainer(container) {
    var link = container.querySelector('a[href*="codigo="]');
    if (!link) return null;
    var href = link.getAttribute("href") || "";
    var match = href.match(/codigo=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function initAddToCartDelegation() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest(".product-card__cta--primary, .about-list-item__cart");
      if (!btn) return;
      event.preventDefault();
      var container = btn.closest(".product-card, .about-list-item");
      if (!container) return;
      var codigo = extractCodigoFromContainer(container);
      if (!codigo) return;
      addItem(codigo, 1);
    });

    document.addEventListener("click", function (event) {
      var minus = event.target.closest(".cart-item__qty-minus");
      var plus = event.target.closest(".cart-item__qty-plus");
      var remove = event.target.closest(".cart-item__remove");
      var trigger = minus || plus || remove;
      if (!trigger) return;
      var row = trigger.closest(".cart-item");
      if (!row) return;
      var codigo = row.getAttribute("data-codigo");
      if (!codigo) return;
      var current = getItems().filter(function (it) { return it.codigo === codigo; })[0];
      var currentQty = current ? current.cantidad : 1;
      if (minus) setQty(codigo, currentQty - 1);
      if (plus) setQty(codigo, currentQty + 1);
      if (remove) removeItem(codigo);
    });
  }

  document.addEventListener("nexmed:cart-updated", function () {
    updateBadge();
    renderDrawer();
  });

  document.addEventListener("nexmed:cart-item-added", function () {
    openDrawer();
  });

  document.addEventListener("DOMContentLoaded", function () {
    updateBadge();
    renderDrawer();
    initDrawerToggle();
    initAddToCartDelegation();
  });
})();
