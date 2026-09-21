(function () {
  "use strict";

  function init() {
    var container = document.getElementById("plantillas-animadas");
    if (!container) return;
    var slides = container.querySelectorAll(".product-star__card-slide");
    if (slides.length < 2) return;

    var current = 0;

    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 3000);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
