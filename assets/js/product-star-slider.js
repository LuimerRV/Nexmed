(function () {
  "use strict";

  /*
   * Rotación de imágenes del Producto estrella: cada contenedor con
   * [data-star-slider] alterna sus .product-star__card-slide cada 3s con el
   * fade + escala definidos en input.css. Lo usan la secuencia de pisadas
   * (izquierda) y la animación de plantillas (card derecha).
   * Con prefers-reduced-motion se queda fija la primera imagen.
   */
  var INTERVAL_MS = 3000;

  function startSlider(container) {
    var slides = container.querySelectorAll(".product-star__card-slide");
    if (slides.length < 2) return;

    var current = 0;

    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, INTERVAL_MS);
  }

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("[data-star-slider]").forEach(startSlider);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
