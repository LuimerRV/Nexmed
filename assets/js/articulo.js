(function () {
  "use strict";

  function relatedCardHTML(a) {
    var imgTag = a.imagen
      ? '<img src="' + a.imagen + '" alt="' + a.titulo + '" loading="lazy" onerror="this.style.display=\'none\'" />'
      : '<div class="shop-card-placeholder" aria-hidden="true"></div>';
    return (
      '<a href="articulo.html?slug=' + encodeURIComponent(a.slug) + '" class="article-card">' +
        '<div class="article-card__media">' +
          imgTag +
          '<span class="article-card__grain" aria-hidden="true"></span>' +
          '<span class="article-card__scrim" aria-hidden="true"></span>' +
        "</div>" +
        '<span class="article-card__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>' +
        "</span>" +
        '<h3 class="article-card__title">' + a.titulo + "</h3>" +
        '<div class="article-card__footer">' +
          '<span class="article-card__date">' + a.fecha + "</span>" +
          '<p class="article-card__excerpt">' + a.resumen + "</p>" +
        "</div>" +
      "</a>"
    );
  }

  function init() {
    var articles = window.NEXMED_ARTICLES || [];
    if (!articles.length) return;

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var article = articles.filter(function (a) {
      return a.slug === slug;
    })[0];
    var notFound = !article;
    if (!article) article = articles[0];

    document.title = article.titulo + " — NEXMED";

    var notFoundBanner = document.getElementById("articulo-not-found");
    if (notFoundBanner) notFoundBanner.hidden = !notFound;

    var breadcrumbTitulo = document.getElementById("articulo-breadcrumb-titulo");
    if (breadcrumbTitulo) breadcrumbTitulo.textContent = article.titulo;

    var titleEl = document.getElementById("articulo-titulo");
    if (titleEl) titleEl.textContent = article.titulo;

    var mediaEl = document.getElementById("articulo-imagen-principal");
    if (mediaEl) {
      if (article.imagen) {
        mediaEl.innerHTML =
          '<img src="' + article.imagen + '" alt="' + article.titulo + '" onerror="this.style.display=\'none\'" />';
      } else {
        mediaEl.innerHTML = "";
      }
    }

    var relatedGrid = document.getElementById("articulo-relacionados");
    var relatedSection = document.getElementById("articulo-relacionados-section");
    var related = articles.filter(function (a) {
      return a.slug !== article.slug;
    });
    if (relatedGrid) relatedGrid.innerHTML = related.map(relatedCardHTML).join("");
    if (relatedSection) relatedSection.hidden = related.length === 0;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
