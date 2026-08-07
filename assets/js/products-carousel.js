(function () {
  "use strict";

  function initProductCarousel() {
    var track = document.getElementById("products-track");
    var prevBtn = document.getElementById("products-prev");
    var nextBtn = document.getElementById("products-next");
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

  document.addEventListener("DOMContentLoaded", initProductCarousel);
})();
