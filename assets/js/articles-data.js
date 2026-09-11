/*
 * Catálogo de artículos de "Novedades". Título, fecha, resumen e imagen son
 * reales (mismos datos ya usados en el carrusel de Novedades del Home). El
 * cuerpo del artículo (assets/articulo.html) usa texto e imágenes de
 * relleno mientras el cliente entrega el contenido real de cada artículo.
 */
(function () {
  "use strict";

  window.NEXMED_ARTICLES = [
    {
      slug: "plantilla-ortopedica-adecuada",
      titulo: "Cómo elegir la plantilla ortopédica adecuada",
      fecha: "Ene 2026",
      resumen: "Claves para entender cuándo y por qué usarlas.",
      imagen: "assets/images/novedades/plantilla-ortopedica-adecuada.png",
    },
    {
      slug: "cuidado-uso-ortesis",
      titulo: "Cuidados y uso correcto de las órtesis",
      fecha: "Feb 2026",
      resumen: "Recomendaciones generales de uso y mantención.",
      imagen: "assets/images/novedades/cuidado-uso-ortesis2.png",
    },
    {
      slug: "medicina-biorreguladora",
      titulo: "Qué es la medicina biorreguladora",
      fecha: "Mar 2026",
      resumen: "Una introducción a esta línea de productos.",
      imagen: "assets/images/novedades/medicina-biorreguladora.png",
    },
  ];
})();
