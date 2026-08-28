(function () {
  "use strict";

  function money(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  function pillsHTML(categoriaLabel) {
    var parts = window.NEXMED_CATEGORY_PILLS ? window.NEXMED_CATEGORY_PILLS(categoriaLabel) : [categoriaLabel];
    return (
      '<div class="product-card__pills">' +
      parts.map(function (part) { return '<span class="product-card__pill">' + part + "</span>"; }).join("") +
      "</div>"
    );
  }

  function relatedCardHTML(p) {
    var imgTag = p.imagen
      ? '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy" onerror="this.style.display=\'none\'" />'
      : '<div class="shop-card-placeholder" aria-hidden="true"></div>';
    var href = "ficha-producto.html?codigo=" + encodeURIComponent(p.codigo);
    return (
      '<div class="product-card">' +
        '<a href="' + href + '" class="product-card__link">' +
          '<div class="product-card__image">' + imgTag + "</div>" +
          '<div class="product-card__body">' +
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

  function bundleItemHTML(p) {
    var imgTag = p.imagen
      ? '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy" onerror="this.style.display=\'none\'" />'
      : '<div class="shop-card-placeholder" aria-hidden="true"></div>';
    return (
      '<div class="pdp-bundle__item">' +
        '<div class="pdp-bundle__item-thumb">' + imgTag + "</div>" +
        '<p class="pdp-bundle__item-name">' + p.nombre + "</p>" +
        '<p class="pdp-bundle__item-price">' + money(p.precio) + "</p>" +
      "</div>"
    );
  }

  function initRelatedCarousel() {
    var track = document.getElementById("pdp-related-grid");
    var prevBtn = document.getElementById("pdp-related-prev");
    var nextBtn = document.getElementById("pdp-related-next");
    if (!track || !prevBtn || !nextBtn) return;

    function cardStep() {
      var card = track.querySelector(".product-card");
      if (!card) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function updateButtons() {
      var maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
    }

    prevBtn.addEventListener("click", function () {
      track.scrollBy({ left: -cardStep(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      track.scrollBy({ left: cardStep(), behavior: "smooth" });
    });
    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  }

  function init() {
    var products = window.NEXMED_PRODUCTS || [];
    if (!products.length) return;

    var params = new URLSearchParams(window.location.search);
    var codigo = params.get("codigo");
    var product = products.filter(function (p) {
      return p.codigo === codigo;
    })[0];
    var notFound = !product;
    if (!product) product = products[0];

    document.title = product.nombre + " — NEXMED";

    var notFoundBanner = document.getElementById("pdp-not-found");
    if (notFoundBanner) notFoundBanner.hidden = !notFound;

    var breadcrumbCat = document.getElementById("pdp-breadcrumb-categoria");
    if (breadcrumbCat) breadcrumbCat.textContent = product.categoriaLabel;
    var breadcrumbName = document.getElementById("pdp-breadcrumb-producto");
    if (breadcrumbName) breadcrumbName.textContent = product.nombre;

    var imageWrap = document.getElementById("pdp-image-wrap");
    var galleryThumbs = document.getElementById("pdp-gallery-thumbs");
    var images = (product.imagenes && product.imagenes.length ? product.imagenes : [product.imagen]).filter(Boolean);

    function setMainImage(src) {
      if (!imageWrap) return;
      if (src) {
        imageWrap.innerHTML =
          '<img src="' + src + '" alt="' + product.nombre + '" onerror="this.style.display=\'none\'" />';
        imageWrap.classList.remove("shop-card-placeholder");
      } else {
        imageWrap.innerHTML = "";
        imageWrap.classList.add("shop-card-placeholder");
      }
    }

    setMainImage(images[0] || null);

    if (galleryThumbs) {
      if (images.length) {
        galleryThumbs.innerHTML = images
          .map(function (src, i) {
            return (
              '<button type="button" class="pdp-gallery__thumb' + (i === 0 ? " is-active" : "") + '" data-src="' + src + '">' +
                '<img src="' + src + '" alt="" loading="lazy" />' +
              "</button>"
            );
          })
          .join("");
        Array.prototype.forEach.call(galleryThumbs.querySelectorAll(".pdp-gallery__thumb"), function (btn) {
          btn.addEventListener("click", function () {
            Array.prototype.forEach.call(galleryThumbs.querySelectorAll(".pdp-gallery__thumb"), function (b) {
              b.classList.remove("is-active");
            });
            btn.classList.add("is-active");
            setMainImage(btn.getAttribute("data-src"));
          });
        });
      } else {
        galleryThumbs.innerHTML = "";
      }
    }

    var categoryPills = document.getElementById("pdp-category-pills");
    if (categoryPills) categoryPills.innerHTML = pillsHTML(product.categoriaLabel);
    var titleEl = document.getElementById("pdp-title");
    if (titleEl) titleEl.textContent = product.nombre;
    var priceEl = document.getElementById("pdp-price");
    if (priceEl) priceEl.textContent = money(product.precio);
    var brandEl = document.getElementById("pdp-brand");
    if (brandEl) brandEl.textContent = product.marca;

    var pendingList = [];
    if (!product.presentacion) pendingList.push("presentación");
    if (!product.dosisHabitual) pendingList.push("dosis habitual");
    if (!product.material) pendingList.push("material");
    var pendingNote = document.getElementById("pdp-pending-note");
    if (pendingNote) {
      if (pendingList.length) {
        pendingNote.innerHTML =
          "<strong>Información pendiente de confirmar por el cliente:</strong> " +
          pendingList.join(", ") +
          ".";
      } else {
        pendingNote.hidden = true;
      }
    }

    var qtyInput = document.getElementById("pdp-qty-input");
    var qtyMinus = document.getElementById("pdp-qty-minus");
    var qtyPlus = document.getElementById("pdp-qty-plus");
    if (qtyInput && qtyMinus && qtyPlus) {
      qtyMinus.addEventListener("click", function () {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
      });
      qtyPlus.addEventListener("click", function () {
        qtyInput.value = parseInt(qtyInput.value || "1", 10) + 1;
      });
    }

    var sameCategory = products.filter(function (p) {
      return p.categoriaLabel === product.categoriaLabel && p.codigo !== product.codigo;
    });

    var related = sameCategory.slice(0, 4);
    var relatedGrid = document.getElementById("pdp-related-grid");
    var relatedSection = document.getElementById("pdp-related-section");
    if (related.length && relatedGrid) {
      relatedGrid.innerHTML = related.map(relatedCardHTML).join("");
      initRelatedCarousel();
    } else if (relatedSection) {
      relatedSection.hidden = true;
    }

    var bundleSection = document.getElementById("pdp-bundle-section");
    var bundleItemsEl = document.getElementById("pdp-bundle-items");
    var bundleTotalEl = document.getElementById("pdp-bundle-total");
    var bundleProducts = [product].concat(sameCategory.slice(0, 2));
    if (bundleSection && bundleItemsEl && bundleTotalEl) {
      if (bundleProducts.length >= 3) {
        var itemsHTML = bundleProducts
          .map(function (p, i) {
            return (i > 0 ? '<span class="pdp-bundle__plus">+</span>' : "") + bundleItemHTML(p);
          })
          .join("");
        bundleItemsEl.innerHTML = itemsHTML;
        var total = bundleProducts.reduce(function (sum, p) {
          return sum + p.precio;
        }, 0);
        bundleTotalEl.textContent = money(total);
        bundleSection.hidden = false;
      } else {
        bundleSection.hidden = true;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
