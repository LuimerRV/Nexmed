(function () {
  "use strict";

  function initHeroSlider() {
    var slides = document.querySelectorAll("#hero-slides .hero-slide");
    var bullets = document.querySelectorAll("#hero-bullets .hero-bullet");
    if (!slides.length) return;

    var current = 0;
    var intervalMs = 6500;
    var timer = null;

    function activate(index) {
      slides.forEach(function (slide, i) {
        if (i === index) {
          slide.classList.remove("is-kenburns");
          void slide.offsetWidth;
          slide.classList.add("is-active", "is-kenburns");
        } else {
          slide.classList.remove("is-active", "is-kenburns");
        }
      });
      bullets.forEach(function (bullet, i) {
        bullet.classList.toggle("is-active", i === index);
        bullet.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      current = index;
    }

    function next() {
      activate((current + 1) % slides.length);
    }

    function startAutoplay() {
      clearInterval(timer);
      timer = setInterval(next, intervalMs);
    }

    bullets.forEach(function (bullet, i) {
      bullet.addEventListener("click", function () {
        activate(i);
        startAutoplay();
      });
    });

    activate(0);
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", initHeroSlider);
})();
