(function () {
  "use strict";

  function money(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  function productCardHTML(p) {
    var imgTag = p.imagen
      ? '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy" onerror="this.style.display=\'none\'" />'
      : '<div class="shop-card-placeholder" aria-hidden="true"></div>';
    var href = "ficha-producto.html?codigo=" + encodeURIComponent(p.codigo);
    return (
      '<div class="product-card">' +
        '<a href="' + href + '" class="product-card__link">' +
          '<div class="product-card__image">' + imgTag + "</div>" +
          '<div class="product-card__body">' +
            '<span class="product-card__stock-pill">En stock</span>' +
            '<h3 class="product-card__title">' + p.nombre + "</h3>" +
            '<span class="product-card__price">' + money(p.precio) + "</span>" +
          "</div>" +
        "</a>" +
        '<div class="product-card__actions">' +
          '<a href="' + href + '" class="product-card__cta product-card__cta--secondary">Ver producto</a>' +
          '<button type="button" class="product-card__cta product-card__cta--primary">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>' +
            "Agregar" +
          "</button>" +
        "</div>" +
      "</div>"
    );
  }

  function setupPriceSlider(minInput, maxInput, rangeEl, labelEl, onChange) {
    var bounds = parseInt(minInput.max, 10);

    function update() {
      var min = parseInt(minInput.value, 10);
      var max = parseInt(maxInput.value, 10);
      if (min > max) {
        min = max;
        minInput.value = min;
      }
      var minPercent = (min / bounds) * 100;
      var maxPercent = (max / bounds) * 100;
      rangeEl.style.left = minPercent + "%";
      rangeEl.style.right = 100 - maxPercent + "%";
      labelEl.textContent = "Precio: " + money(min) + " — " + money(max);
      onChange(min, max);
    }

    minInput.addEventListener("input", update);
    maxInput.addEventListener("input", update);
    update();
  }

  function init() {
    var products = window.NEXMED_PRODUCTS || [];
    var grid = document.getElementById("shop-grid");
    var categoryFilters = document.getElementById("shop-category-filters");
    var brandFilters = document.getElementById("shop-brand-filters");
    var minInput = document.getElementById("shop-price-min");
    var maxInput = document.getElementById("shop-price-max");
    var priceRangeEl = document.getElementById("shop-price-range");
    var priceLabelEl = document.getElementById("shop-price-label");
    var sortSelect = document.getElementById("shop-sort");
    var resultsCount = document.getElementById("shop-results-count");
    var totalCount = document.getElementById("shop-total-count");
    var emptyState = document.getElementById("shop-empty-state");
    if (!grid || !categoryFilters || !brandFilters) return;

    var categories = [];
    var brands = [];
    products.forEach(function (p) {
      if (categories.indexOf(p.categoriaLabel) === -1) categories.push(p.categoriaLabel);
      if (brands.indexOf(p.marca) === -1) brands.push(p.marca);
    });
    (window.NEXMED_BRANDS_SIN_PRODUCTOS || []).forEach(function (b) {
      if (brands.indexOf(b) === -1) brands.push(b);
    });

    categoryFilters.innerHTML = categories
      .map(function (c) {
        return (
          '<label class="shop-checkbox-row"><input type="checkbox" value="' +
          c +
          '" data-filter="categoria" checked />' +
          c +
          "</label>"
        );
      })
      .join("");

    brandFilters.innerHTML = brands
      .map(function (b) {
        return (
          '<label class="shop-checkbox-row"><input type="checkbox" value="' +
          b +
          '" data-filter="marca" checked />' +
          b +
          "</label>"
        );
      })
      .join("");

    var requestedMarca = new URLSearchParams(window.location.search).get("marca");
    if (requestedMarca && brands.indexOf(requestedMarca) !== -1) {
      Array.prototype.forEach.call(brandFilters.querySelectorAll("input"), function (input) {
        input.checked = input.value === requestedMarca;
      });
    }

    if (totalCount) totalCount.textContent = products.length;

    var currentMin = 0;
    var currentMax = Infinity;

    function render() {
      var checkedCategories = Array.prototype.slice
        .call(categoryFilters.querySelectorAll("input:checked"))
        .map(function (i) {
          return i.value;
        });
      var checkedBrands = Array.prototype.slice
        .call(brandFilters.querySelectorAll("input:checked"))
        .map(function (i) {
          return i.value;
        });
      var sortMode = sortSelect ? sortSelect.value : "relevancia";

      // Un grupo de filtros sin ninguna casilla marcada se trata como "sin
      // restricción" (se muestran todas las opciones), no como "excluir todo".
      var effectiveCategories = checkedCategories.length ? checkedCategories : categories;
      var effectiveBrands = checkedBrands.length ? checkedBrands : brands;

      var visibleCount = 0;
      var html = "";

      categories.forEach(function (cat) {
        if (effectiveCategories.indexOf(cat) === -1) return;
        var items = products.filter(function (p) {
          return (
            p.categoriaLabel === cat &&
            effectiveBrands.indexOf(p.marca) !== -1 &&
            p.precio >= currentMin &&
            p.precio <= currentMax
          );
        });
        if (!items.length) return;
        if (sortMode === "precio-asc") items.sort(function (a, b) { return a.precio - b.precio; });
        if (sortMode === "precio-desc") items.sort(function (a, b) { return b.precio - a.precio; });
        visibleCount += items.length;
        html += '<h2 class="shop-category-heading">' + cat + "</h2>";
        html += '<div class="shop-grid">' + items.map(productCardHTML).join("") + "</div>";
      });

      grid.innerHTML = html;
      if (resultsCount) resultsCount.textContent = visibleCount;
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    }

    categoryFilters.addEventListener("change", render);
    brandFilters.addEventListener("change", render);
    if (sortSelect) sortSelect.addEventListener("change", render);

    if (minInput && maxInput && priceRangeEl && priceLabelEl) {
      setupPriceSlider(minInput, maxInput, priceRangeEl, priceLabelEl, function (min, max) {
        currentMin = min;
        currentMax = max;
        render();
      });
    } else {
      render();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
