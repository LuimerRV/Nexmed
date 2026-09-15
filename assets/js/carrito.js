(function () {
  "use strict";

  function money(n) {
    return "$" + Math.round(n).toLocaleString("es-CL");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function itemRowHTML(item) {
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

  function render() {
    var emptyEl = document.getElementById("carrito-empty");
    var contentEl = document.getElementById("carrito-content");
    var itemsEl = document.getElementById("carrito-items");
    var summaryListEl = document.getElementById("carrito-summary-list");
    var totalEl = document.getElementById("carrito-total");
    if (!emptyEl || !contentEl || !itemsEl || !window.NEXMED_CART) return;

    var items = window.NEXMED_CART.getItems();

    if (!items.length) {
      emptyEl.hidden = false;
      contentEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    contentEl.hidden = false;
    itemsEl.innerHTML = items.map(itemRowHTML).join("");

    if (summaryListEl) {
      summaryListEl.innerHTML = items
        .map(function (it) {
          return (
            '<div class="step-summary__row"><span>' +
            escapeHtml(it.nombre) +
            " × " +
            it.cantidad +
            "</span><span>" +
            money(it.subtotal) +
            "</span></div>"
          );
        })
        .join("");
    }
    if (totalEl) totalEl.textContent = money(window.NEXMED_CART.getSubtotal());
  }

  document.addEventListener("nexmed:cart-updated", render);
  document.addEventListener("DOMContentLoaded", render);
})();
