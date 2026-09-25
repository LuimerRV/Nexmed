(function () {
  "use strict";

  /*
   * Carrusel horizontal genérico con loop infinito (productos destacados,
   * Novedades, Evidencia). Marcado:
   *   [data-carousel]        contenedor que agrupa track y flechas
   *   [data-carousel-track]  lista con scroll horizontal (scroll-snap en CSS)
   *   [data-carousel-prev] / [data-carousel-next]  flechas
   *
   * Loop: se clonan las tarjetas antes y después de las originales
   * ([clones][originales][clones]). Cuando el scroll se asienta fuera del
   * bloque original —por flecha, swipe o teclado— se reubica al instante en
   * la posición equivalente del bloque original, así que el recorrido nunca
   * termina y el salto no se percibe. Los clones son aria-hidden y quedan
   * fuera del orden de tabulación (siguen siendo clicables).
   * Si todas las tarjetas caben a la vez, no se clona (evita duplicados
   * visibles lado a lado) y las flechas se deshabilitan.
   */
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function makeClone(node) {
    var clone = node.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("data-carousel-clone", "");
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach(function (el) {
      el.removeAttribute("id");
    });
    if (clone.matches("a, button")) clone.setAttribute("tabindex", "-1");
    clone.querySelectorAll("a, button, input, select, textarea").forEach(function (el) {
      el.setAttribute("tabindex", "-1");
    });
    return clone;
  }

  function initCarousel(root) {
    var track = root.querySelector("[data-carousel-track]");
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    if (!track || !prevBtn || !nextBtn) return;

    var originals = Array.prototype.slice.call(track.children);
    if (!originals.length) return;

    // Mantener la entrada escalonada (scroll-reveal) en las tarjetas visibles
    // aunque ya no sean los primeros hijos del track.
    originals.slice(0, 4).forEach(function (card, i) {
      card.style.transitionDelay = i * 100 + "ms";
    });

    var looping = track.scrollWidth > track.clientWidth + 4;
    var setWidth = 0;

    if (looping) {
      var before = document.createDocumentFragment();
      var after = document.createDocumentFragment();
      originals.forEach(function (card) {
        before.appendChild(makeClone(card));
        after.appendChild(makeClone(card));
      });
      track.insertBefore(before, track.firstChild);
      track.appendChild(after);
    }

    function measureSet() {
      // Distancia entre la primera tarjeta clonada y la primera original.
      setWidth = looping ? originals[0].offsetLeft - track.firstElementChild.offsetLeft : 0;
    }

    function cardStep() {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return originals[0].getBoundingClientRect().width + gap;
    }

    function jumpTo(left) {
      // Salto instantáneo: sin animación para que no se perciba.
      track.style.scrollSnapType = "none";
      track.scrollLeft = left;
      track.style.scrollSnapType = "";
    }

    function normalize() {
      if (!looping || !setWidth) return;
      if (track.scrollLeft < setWidth * 0.5) jumpTo(track.scrollLeft + setWidth);
      else if (track.scrollLeft >= setWidth * 1.5) jumpTo(track.scrollLeft - setWidth);
    }

    function updateButtons() {
      if (looping) return;
      var maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
    }

    function move(direction) {
      normalize();
      track.scrollBy({
        left: direction * cardStep(),
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }

    prevBtn.addEventListener("click", function () {
      move(-1);
    });
    nextBtn.addEventListener("click", function () {
      move(1);
    });

    // Reubicar cuando el scroll termina (scrollend donde exista; si no, debounce).
    var settleTimer = null;
    track.addEventListener(
      "scroll",
      function () {
        updateButtons();
        clearTimeout(settleTimer);
        settleTimer = setTimeout(normalize, 140);
      },
      { passive: true }
    );
    track.addEventListener("scrollend", normalize);

    window.addEventListener("resize", function () {
      if (looping) {
        var step = cardStep();
        var index = step ? Math.round((track.scrollLeft - setWidth) / step) : 0;
        measureSet();
        jumpTo(setWidth + ((index % originals.length) + originals.length) % originals.length * cardStep());
      }
      updateButtons();
    });

    measureSet();
    if (looping) jumpTo(setWidth);
    updateButtons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(initCarousel);
  });
})();
