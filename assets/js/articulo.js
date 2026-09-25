(function () {
  "use strict";

  /*
   * Vista interna de artículo (articulo.html?slug=...). Busca el slug en las
   * dos colecciones de articles-data.js y adapta la página al tipo:
   * - Novedades (blog pacientes): vuelve al Home; cuerpo estático del HTML.
   * - Evidencia (profesionales): vuelve a Profesionales; muestra especialidad,
   *   autor y estado de revisión, y arma el cuerpo desde los datos.
   */
  var COLLECTIONS = {
    novedad: {
      items: window.NEXMED_ARTICLES || [],
      volverHref: "index.html#novedades",
      volverTexto: "Volver al inicio",
      seccionHref: "index.html#novedades",
      seccionTexto: "Novedades",
      relacionadosTitulo: "Más novedades",
    },
    evidencia: {
      items: window.NEXMED_EVIDENCE || [],
      volverHref: "profesionales.html#profesionales-evidencia",
      volverTexto: "Volver a Evidencia y estudios",
      seccionHref: "profesionales.html#profesionales-evidencia",
      seccionTexto: "Evidencia y estudios",
      relacionadosTitulo: "Más evidencia y estudios",
    },
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function findArticle(slug) {
    var types = Object.keys(COLLECTIONS);
    for (var i = 0; i < types.length; i++) {
      var match = COLLECTIONS[types[i]].items.filter(function (a) {
        return a.slug === slug;
      })[0];
      if (match) return { article: match, type: types[i] };
    }
    return null;
  }

  function relatedCardHTML(a) {
    var imgTag = a.imagen
      ? '<img src="' + a.imagen + '" alt="' + escapeHtml(a.titulo) + '" loading="lazy" onerror="this.style.display=\'none\'" />'
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
        '<h3 class="article-card__title">' + escapeHtml(a.titulo) + "</h3>" +
        '<div class="article-card__footer">' +
          '<span class="article-card__date">' + escapeHtml(a.fecha) + "</span>" +
          '<p class="article-card__excerpt">' + escapeHtml(a.resumen) + "</p>" +
        "</div>" +
      "</a>"
    );
  }

  function evidenceMetaHTML(a) {
    return (
      '<span class="articulo-meta__pill">' + escapeHtml(a.especialidad) + "</span>" +
      '<span class="articulo-meta__item">' + escapeHtml(a.autor) + " · " + escapeHtml(a.fecha) + "</span>" +
      '<span class="articulo-meta__reviewed">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><path d="M20 6L9 17l-5-5" /></svg>' +
        "Revisado y aprobado por NEXMED" +
      "</span>"
    );
  }

  function evidenceBodyHTML(a) {
    var sections = (a.secciones || [])
      .map(function (s) {
        return (
          '<h2 class="articulo-section-title">' + escapeHtml(s.titulo) + "</h2>" +
          s.parrafos
            .map(function (p) {
              return "<p>" + escapeHtml(p) + "</p>";
            })
            .join("")
        );
      })
      .join("");
    return (
      '<div class="articulo-body mt-6"><p class="articulo-lead">' + escapeHtml(a.intro) + "</p></div>" +
      '<div id="articulo-imagen-principal" class="articulo-media mt-10"></div>' +
      '<div class="articulo-body mt-10">' + sections + "</div>"
    );
  }

  function setLink(id, href, text) {
    var el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("href", href);
    if (text) el.textContent = text;
  }

  function init() {
    var slug = new URLSearchParams(window.location.search).get("slug");
    var found = findArticle(slug);
    var notFound = !found;
    if (!found) {
      var fallback = COLLECTIONS.novedad.items[0];
      if (!fallback) return;
      found = { article: fallback, type: "novedad" };
    }
    var article = found.article;
    var config = COLLECTIONS[found.type];

    document.title = article.titulo + " — NEXMED";

    var notFoundBanner = document.getElementById("articulo-not-found");
    if (notFoundBanner) notFoundBanner.hidden = !notFound;

    setLink("articulo-volver", config.volverHref);
    var volverTexto = document.getElementById("articulo-volver-texto");
    if (volverTexto) volverTexto.textContent = config.volverTexto;
    setLink("articulo-breadcrumb-seccion", config.seccionHref, config.seccionTexto);

    var breadcrumbTitulo = document.getElementById("articulo-breadcrumb-titulo");
    if (breadcrumbTitulo) breadcrumbTitulo.textContent = article.titulo;

    var titleEl = document.getElementById("articulo-titulo");
    if (titleEl) titleEl.textContent = article.titulo;

    if (found.type === "evidencia") {
      var metaEl = document.getElementById("articulo-meta");
      if (metaEl) {
        metaEl.innerHTML = evidenceMetaHTML(article);
        metaEl.hidden = false;
      }
      var bodyEl = document.getElementById("articulo-cuerpo");
      if (bodyEl) bodyEl.innerHTML = evidenceBodyHTML(article);
    }

    var mediaEl = document.getElementById("articulo-imagen-principal");
    if (mediaEl) {
      mediaEl.innerHTML = article.imagen
        ? '<img src="' + article.imagen + '" alt="' + escapeHtml(article.titulo) + '" onerror="this.style.display=\'none\'" />'
        : "";
    }

    var relatedGrid = document.getElementById("articulo-relacionados");
    var relatedSection = document.getElementById("articulo-relacionados-section");
    var relatedTitle = document.getElementById("articulo-relacionados-titulo");
    var related = config.items
      .filter(function (a) {
        return a.slug !== article.slug;
      })
      .slice(0, 3);
    if (relatedTitle) relatedTitle.textContent = config.relacionadosTitulo;
    if (relatedGrid) relatedGrid.innerHTML = related.map(relatedCardHTML).join("");
    if (relatedSection) relatedSection.hidden = related.length === 0;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
