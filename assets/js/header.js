(function () {
  "use strict";

  var NAV_ITEMS = [
    { key: "inicio", label: "Inicio", href: "index.html" },
    { key: "nosotros", label: "Nosotros", href: "nosotros.html" },
    { key: "tienda", label: "Tienda", href: "tienda.html" },
    { key: "novedades", label: "Novedades", href: "novedades.html" },
    { key: "profesionales", label: "Profesionales", href: "profesionales.html" },
    { key: "contacto", label: "Contacto", href: "contacto.html" },
  ];

  function renderDesktopNavItem(item, isActive) {
    if (item.comingSoon) {
      return (
        '<span class="header-nav-comingsoon inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">' +
        item.label +
        '<span class="header-nav-comingsoon-tag rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">Próximamente</span>' +
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

  function renderMobileNavItem(item, isActive) {
    if (item.comingSoon) {
      return (
        '<span class="inline-flex items-center gap-2 text-base text-ink-secondary/70">' +
        item.label +
        '<span class="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-secondary">Próximamente</span>' +
        "</span>"
      );
    }

    var stateClass = isActive ? "text-brand-purple" : "text-ink-primary hover:text-brand-blue";
    var underlineClass = isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100";

    return (
      '<a href="' +
      item.href +
      '"' +
      (isActive ? ' aria-current="page"' : "") +
      ' class="group relative inline-flex items-center text-base font-medium transition-colors duration-300 ' +
      stateClass +
      '">' +
      item.label +
      '<span class="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-brand-blue transition-transform duration-300 motion-reduce:transition-none ' +
      underlineClass +
      '" aria-hidden="true"></span></a>'
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

    var mobileList = document.getElementById("mobile-nav-list");
    if (mobileList) {
      mobileList.innerHTML = NAV_ITEMS.map(function (item) {
        return "<li>" + renderMobileNavItem(item, item.key === currentPage) + "</li>";
      }).join("");
    }
  }

  function initPanels() {
    var panels = [
      {
        button: document.getElementById("mobile-menu-button"),
        panel: document.getElementById("mobile-menu"),
        openLabel: "Abrir menú",
        closeLabel: "Cerrar menú",
        focusSelector: "#mobile-nav-list a",
        swapIcons: true,
        animationClass: "animate-header-menu-in",
      },
      {
        button: document.getElementById("search-toggle-button"),
        panel: document.getElementById("search-panel"),
        openLabel: "Buscar",
        closeLabel: "Buscar",
        focusSelector: "#header-search-input",
        swapIcons: false,
        animationClass: "animate-search-panel-in",
        overlay: document.getElementById("search-overlay"),
      },
    ].filter(function (entry) {
      return entry.button && entry.panel;
    });

    var iconMenu = document.getElementById("icon-menu");
    var iconClose = document.getElementById("icon-close");

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

      if (entry.swapIcons && iconMenu && iconClose) {
        iconMenu.classList.toggle("hidden", open);
        iconClose.classList.toggle("hidden", !open);
      }

      var anyOpen = panels.some(function (p) {
        return !p.panel.hidden;
      });
      document.documentElement.classList.toggle("overflow-hidden", anyOpen);

      if (open) {
        var animationClass = entry.animationClass || "animate-header-menu-in";
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
    return {
      name: product.nombre,
      price: "$" + product.precio.toLocaleString("es-CL"),
      image: product.imagen || "assets/images/productos/plantilla-ortopedica.png",
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
    initPanels();
    initSearch();
    initScrollEffect();
  });
})();
