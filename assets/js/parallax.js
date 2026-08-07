(function () {
  "use strict";

  function initParallax() {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (!elements.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var active = new Set();
    var ticking = false;

    function update() {
      active.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        var viewportCenter = window.innerHeight / 2;
        var elementCenter = rect.top + rect.height / 2;
        var range = parseFloat(el.getAttribute("data-parallax-range")) || 24;
        var offset = (elementCenter - viewportCenter) * 0.06;
        offset = Math.max(-range, Math.min(range, offset));
        el.style.transform = "translateY(" + offset.toFixed(1) + "px)";
      });
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            active.add(entry.target);
          } else {
            active.delete(entry.target);
          }
        });
      },
      { rootMargin: "20% 0px 20% 0px" }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", initParallax);
})();
