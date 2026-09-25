(function () {
  "use strict";

  var NAV_ITEMS = [
    { key: "inicio", label: "Inicio", href: "index.html" },
    { key: "nosotros", label: "Nosotros", href: "nosotros.html" },
    { key: "tienda", label: "Tienda", href: "tienda.html" },
    { key: "plantillas", label: "Plantillas", href: "plantillas.html" },
    { key: "profesionales", label: "Profesionales", href: "profesionales.html" },
    { key: "contacto", label: "Contacto", href: "contacto.html" },
  ];

  function renderDesktopNavItem(item, isActive) {
    if (item.comingSoon) {
      return (
        '<span class="header-nav-comingsoon inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">' +
        item.label +
        "</span>"
      );
    }

    return (
      '<a href="' +
      item.href +
      '"' +
      (isActive ? ' aria-current="page"' : "") +
      ' class="header-link' +
      (isActive ? " header-link--active" : "") +
      ' inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">' +
      item.label +
      "</a>"
    );
  }

  function initNav() {
    var currentPage = document.body.getAttribute("data-page") || "";

    var desktopList = document.getElementById("primary-nav-list");
    if (desktopList) {
      desktopList.innerHTML = NAV_ITEMS.map(function (item) {
        return "<li>" + renderDesktopNavItem(item, item.key === currentPage) + "</li>";
      }).join("");
    }
  }

  /*
   * Sidebar de navegación (móvil y tablet, < lg). Se genera aquí para que
   * los enlaces y los datos de contacto tengan una única fuente en las 14
   * páginas. Los datos de contacto son los mismos del footer.
   */
  var SIDEBAR_CONTACT = [
    { label: "Tel. +56 2 2345 6789", href: "tel:+56223456789" },
    { label: "infocontacto@nexmed.cl", href: "mailto:infocontacto@nexmed.cl" },
    { label: "Lun a Vie · 9:00–18:00" },
  ];

  var ARROW_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mobile-sidebar__arrow">' +
    '<path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>';

  function renderSidebarNavItem(item, isActive, index) {
    return (
      '<li style="--i:' +
      index +
      '"><a href="' +
      item.href +
      '"' +
      (isActive ? ' aria-current="page"' : "") +
      ' class="mobile-sidebar__link">' +
      "<span>" +
      item.label +
      "</span>" +
      ARROW_ICON +
      "</a></li>"
    );
  }

  function renderSidebarContactItem(item) {
    return item.href
      ? '<li><a href="' + item.href + '" class="mobile-sidebar__contact-link">' + item.label + "</a></li>"
      : "<li>" + item.label + "</li>";
  }

  function buildSidebar(currentPage) {
    var overlay = document.createElement("div");
    overlay.id = "mobile-menu-overlay";
    overlay.className = "mobile-sidebar-overlay";
    overlay.hidden = true;

    var panel = document.createElement("div");
    panel.id = "mobile-menu";
    panel.className = "mobile-sidebar";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Menú de navegación");
    panel.innerHTML =
      '<div class="mobile-sidebar__top">' +
      '<a href="index.html" class="mobile-sidebar__logo" aria-label="NEXMED, ir al inicio">' +
      '<img src="assets/images/nexmed-logo.webp" alt="" width="3508" height="1430" /></a>' +
      '<button type="button" id="mobile-menu-close" class="header-icon-pill mobile-sidebar__close" aria-label="Cerrar menú">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-5 w-5">' +
      '<path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg></button>' +
      "</div>" +
      '<nav aria-label="Navegación principal" class="mobile-sidebar__nav"><ul>' +
      NAV_ITEMS.map(function (item, index) {
        return renderSidebarNavItem(item, item.key === currentPage, index);
      }).join("") +
      "</ul></nav>" +
      '<div class="mobile-sidebar__contact">' +
      '<p class="mobile-sidebar__heading">Contacto</p>' +
      "<ul>" +
      SIDEBAR_CONTACT.map(renderSidebarContactItem).join("") +
      "</ul></div>";

    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    return { overlay: overlay, panel: panel };
  }

  function initSidebar() {
    var button = document.getElementById("mobile-menu-button");
    if (!button) return;

    var parts = buildSidebar(document.body.getAttribute("data-page") || "");
    var overlay = parts.overlay;
    var panel = parts.panel;
    var closeButton = panel.querySelector("#mobile-menu-close");
    var desktopQuery = window.matchMedia("(min-width: 1024px)");
    var hideTimer = null;

    function isOpen() {
      return panel.classList.contains("is-open");
    }

    function focusableElements() {
      return Array.prototype.slice.call(panel.querySelectorAll("a[href], button:not([disabled])"));
    }

    function open() {
      clearTimeout(hideTimer);
      overlay.hidden = false;
      panel.hidden = false;
      // Forzar reflow para que la transición de entrada parta desde fuera de pantalla.
      void panel.offsetWidth;
      overlay.classList.add("is-open");
      panel.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("overflow-hidden");
      closeButton.focus();
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      overlay.classList.remove("is-open");
      panel.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("overflow-hidden");
      // Ocultar tras la transición de salida (duración en input.css).
      hideTimer = setTimeout(function () {
        overlay.hidden = true;
        panel.hidden = true;
      }, 450);
      if (returnFocus) button.focus();
    }

    button.addEventListener("click", open);
    closeButton.addEventListener("click", function () {
      close(true);
    });
    overlay.addEventListener("click", function () {
      close(true);
    });

    panel.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      // Mantener el foco dentro del diálogo mientras está abierto.
      var items = focusableElements();
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // En desktop la navegación vuelve a la cápsula del header.
    desktopQuery.addEventListener("change", function (event) {
      if (event.matches) close(false);
    });
  }

  function initPanels() {
    var panels = [
      {
        button: document.getElementById("search-toggle-button"),
        panel: document.getElementById("search-panel"),
        openLabel: "Buscar",
        closeLabel: "Buscar",
        focusSelector: "#header-search-input",
        animationClass: "animate-search-panel-in",
        overlay: document.getElementById("search-overlay"),
      },
    ].filter(function (entry) {
      return entry.button && entry.panel;
    });

    function closeAll(exceptEntry) {
      panels.forEach(function (entry) {
        if (entry === exceptEntry || entry.panel.hidden) return;
        setOpen(entry, false);
      });
    }

    function setOpen(entry, open) {
      entry.panel.hidden = !open;
      if (entry.overlay) entry.overlay.hidden = !open;
      entry.button.setAttribute("aria-expanded", String(open));
      entry.button.setAttribute("aria-label", open ? entry.closeLabel : entry.openLabel);

      var anyOpen = panels.some(function (p) {
        return !p.panel.hidden;
      });
      document.documentElement.classList.toggle("overflow-hidden", anyOpen);

      if (open) {
        var animationClass = entry.animationClass;
        entry.panel.classList.remove(animationClass);
        void entry.panel.offsetWidth;
        entry.panel.classList.add(animationClass);
        var target = entry.panel.querySelector(entry.focusSelector);
        if (target) target.focus();
      }
    }

    panels.forEach(function (entry) {
      entry.button.addEventListener("click", function () {
        var willOpen = entry.panel.hidden;
        closeAll(entry);
        setOpen(entry, willOpen);
      });

      if (entry.overlay) {
        entry.overlay.addEventListener("click", function () {
          setOpen(entry, false);
          entry.button.focus();
        });
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var openEntry = panels.find(function (entry) {
        return !entry.panel.hidden;
      });
      if (!openEntry) return;
      setOpen(openEntry, false);
      openEntry.button.focus();
    });
  }

  var SEARCHABLE_PRODUCTS = (window.NEXMED_PRODUCTS || []).map(function (product) {
    var isService = window.NEXMED_IS_SERVICE && window.NEXMED_IS_SERVICE(product);
    return {
      name: window.NEXMED_DISPLAY_NAME ? window.NEXMED_DISPLAY_NAME(product) : product.nombre,
      price: isService ? "Servicio · Agenda tu hora" : "$" + product.precio.toLocaleString("es-CL"),
      image: product.imagen || "assets/images/productos/plantilla-ortopedica.webp",
      href: "ficha-producto.html?codigo=" + encodeURIComponent(product.codigo),
    };
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function renderSearchResult(product) {
    return (
      '<a href="' +
      product.href +
      '" class="search-result">' +
      '<span class="search-result__image"><img src="' +
      product.image +
      '" alt="" loading="lazy" onerror="this.style.display=\'none\'" /></span>' +
      '<span class="search-result__info">' +
      '<span class="search-result__name">' +
      escapeHtml(product.name) +
      "</span>" +
      '<span class="search-result__price">' +
      escapeHtml(product.price) +
      "</span>" +
      "</span>" +
      "</a>"
    );
  }

  function initSearch() {
    var input = document.getElementById("header-search-input");
    var resultsEl = document.getElementById("search-results");
    var clearButton = document.getElementById("search-clear-button");
    if (!input || !resultsEl) return;

    function render(query) {
      var q = query.trim().toLowerCase();
      clearButton.hidden = query.length === 0;

      if (!q) {
        resultsEl.innerHTML = '<p class="search-panel__empty">Escribe para buscar en nuestro catálogo.</p>';
        return;
      }

      var matches = SEARCHABLE_PRODUCTS.filter(function (product) {
        return product.name.toLowerCase().indexOf(q) !== -1;
      });

      if (!matches.length) {
        resultsEl.innerHTML =
          '<p class="search-panel__empty">Sin resultados para "' + escapeHtml(query.trim()) + '".</p>';
        return;
      }

      resultsEl.innerHTML = matches.map(renderSearchResult).join("");
    }

    input.addEventListener("input", function () {
      render(input.value);
    });

    clearButton.addEventListener("click", function () {
      input.value = "";
      render("");
      input.focus();
    });
  }

  function initScrollEffect() {
    var sentinel = document.getElementById("header-sentinel");
    var header = document.getElementById("site-header");
    if (!sentinel || !header) return;

    var observer = new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled-header", !entries[0].isIntersecting);
    });

    observer.observe(sentinel);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initSidebar();
    initPanels();
    initSearch();
    initScrollEffect();
  });
})();
