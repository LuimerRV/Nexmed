(function () {
  "use strict";

  var STEP_LABELS = {
    1: "Datos de envío",
    2: "Método de pago",
    3: "Confirmación",
  };

  function money(n) {
    return "$" + Math.round(n).toLocaleString("es-CL");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function init() {
    var cart = window.NEXMED_CART;
    var emptyEl = document.getElementById("checkout-empty");
    var flowEl = document.getElementById("checkout-flow");
    if (!cart || !cart.getItems().length) {
      if (emptyEl) emptyEl.hidden = false;
      if (flowEl) flowEl.hidden = true;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    if (flowEl) flowEl.hidden = false;

    var current = 1;
    var metodoPago = "WebPay";

    var stepCaption = document.getElementById("checkout-step-label");
    var stepperSteps = document.querySelectorAll("#checkout-stepper .stepper-step");
    var panels = document.querySelectorAll("[data-step-panel]");
    var actionsBar = document.getElementById("checkout-actions");
    var backBtn = document.getElementById("checkout-btn-back");
    var nextBtn = document.getElementById("checkout-btn-next");

    function renderStepper() {
      stepperSteps.forEach(function (el) {
        var stepNum = Number(el.getAttribute("data-step"));
        el.classList.remove("is-active", "is-done");
        if (stepNum < current) el.classList.add("is-done");
        else if (stepNum === current) el.classList.add("is-active");
      });
    }

    function renderPanels() {
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-step-panel") !== String(current);
      });
    }

    function renderActions() {
      if (current === 3) {
        actionsBar.hidden = true;
        return;
      }
      actionsBar.hidden = false;
      backBtn.style.visibility = current === 1 ? "hidden" : "visible";
      nextBtn.hidden = current === 2;
    }

    function goTo(step) {
      current = step;
      if (stepCaption) stepCaption.textContent = STEP_LABELS[step];
      renderStepper();
      renderPanels();
      renderActions();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderOrderSummary() {
      var items = cart.getItems();
      var rowsHTML = items
        .map(function (it) {
          return (
            '<div class="step-summary__row"><span>' +
            escapeHtml(it.nombre) +
            " × " +
            it.cantidad +
            "</span><span>" +
            money(it.subtotal) +
            "</span></div>"
          );
        })
        .join("");
      var totalText = money(cart.getSubtotal());

      var list1 = document.getElementById("checkout-summary-list-1");
      var total1 = document.getElementById("checkout-total-1");
      var list2 = document.getElementById("checkout-summary-list-2");
      var total2 = document.getElementById("checkout-total-2");
      if (list1) list1.innerHTML = rowsHTML;
      if (total1) total1.textContent = totalText;
      if (list2) list2.innerHTML = rowsHTML;
      if (total2) total2.textContent = totalText;
    }

    function wirePillGroup(selector, onSelect) {
      var buttons = document.querySelectorAll(selector + " .option-pill");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) {
            b.classList.remove("is-selected");
          });
          btn.classList.add("is-selected");
          onSelect(btn.getAttribute("data-value"));
        });
      });
    }

    wirePillGroup('[data-field="metodo-pago"]', function (value) {
      metodoPago = value;
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (current < 2) goTo(current + 1);
      });
    }
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (current > 1) goTo(current - 1);
      });
    }

    var confirmBtn = document.getElementById("checkout-confirm-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        cart.clearCart();
        goTo(3);
      });
    }

    renderOrderSummary();
    goTo(1);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
