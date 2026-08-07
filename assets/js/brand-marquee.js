(function () {
  "use strict";

  function initBrandMarquee() {
    var marquee = document.querySelector(".brand-marquee");
    var track = document.querySelector(".brand-track");
    if (!marquee || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var FAST_DURATION = 36;
    var SLOW_DURATION = 72;

    var halfWidth = 0;
    var position = 0;
    var speed = 0;
    var lastTime = null;
    var hovering = false;

    function computeSpeed() {
      halfWidth = track.getBoundingClientRect().width / 2;
      speed = halfWidth / (hovering ? SLOW_DURATION : FAST_DURATION);
    }

    function frame(time) {
      if (lastTime === null) lastTime = time;
      var dt = (time - lastTime) / 1000;
      lastTime = time;

      position -= speed * dt;
      if (halfWidth > 0 && position <= -halfWidth) {
        position += halfWidth;
      }
      track.style.transform = "translateX(" + position.toFixed(2) + "px)";
      requestAnimationFrame(frame);
    }

    track.style.animation = "none";
    computeSpeed();

    marquee.addEventListener("mouseenter", function () {
      hovering = true;
      computeSpeed();
    });
    marquee.addEventListener("mouseleave", function () {
      hovering = false;
      computeSpeed();
    });
    window.addEventListener("resize", computeSpeed);

    requestAnimationFrame(frame);
  }

  document.addEventListener("DOMContentLoaded", initBrandMarquee);
})();
