(function () {
  "use strict";

  /*
   * Compra de plantilla a medida (agendar-plantilla.html):
   *   1 Datos y configuración → 2 Receta (obligatoria) → 3 Resumen y pago →
   *   4 Confirmación.
   * Sin calendario: NEXMED coordina la entrega directamente con el paciente.
   * Quien no tiene receta es derivado por WhatsApp; la evaluación con
   * agendamiento queda como "Próximamente".
   */
  var STEP_LABELS = {
    1: "Configuración de la plantilla",
    2: "Carga de la receta médica",
    3: "Resumen y pago",
    4: "Confirmación",
  };

  // Precio público de OP2026-EM (IVA incluido, fuente: archivo del cliente).
  var PRODUCT_LABEL = "Plantilla a medida";
  var PRICE_TOTAL = 70000;
  var IVA_RATE = 0.19;

  function money(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* Neto redondeado a peso; el IVA es la diferencia, así neto + IVA = total exacto. */
  function priceBreakdownHTML() {
    var neto = Math.round(PRICE_TOTAL / (1 + IVA_RATE));
    var iva = PRICE_TOTAL - neto;
    return (
      '<div class="step-summary__row"><span>' + PRODUCT_LABEL + " (neto)</span><span>" + money(neto) + "</span></div>" +
      '<div class="step-summary__row"><span>IVA (19%)</span><span>' + money(iva) + "</span></div>" +
      '<div class="step-summary__total"><span>Total</span><span>' + money(PRICE_TOTAL) + "</span></div>"
    );
  }

  function init() {
    var current = 1;
    var state = {
      tipoUso: "Deportivo",
      color: "Azul",
      talla: "",
      pie: "Ambos",
      recetaNombre: null,
    };

    var stepCaption = document.getElementById("agendar-step-label");
    var stepperSteps = document.querySelectorAll("#agendar-stepper .stepper-step");
    var panels = document.querySelectorAll("[data-step-panel]");
    var actionsBar = document.getElementById("agendar-actions");
    var backBtn = document.getElementById("btn-back");
    var nextBtn = document.getElementById("btn-next");
    var recetaWarning = document.getElementById("receta-warning");

    document.querySelectorAll("[data-price-breakdown]").forEach(function (el) {
      el.innerHTML = priceBreakdownHTML();
    });

    function fieldValue(id) {
      var el = document.getElementById(id);
      return el && el.value.trim() ? el.value.trim() : "";
    }

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
      if (current === 4) {
        actionsBar.hidden = true;
        return;
      }
      actionsBar.hidden = false;
      backBtn.style.visibility = current === 1 ? "hidden" : "visible";
      // En el paso 3 el avance lo da "Pagar con WebPay".
      nextBtn.hidden = current === 3;
    }

    function renderReview() {
      var values = {
        nombre: fieldValue("agendar-nombre"),
        telefono: fieldValue("agendar-telefono"),
        correo: fieldValue("agendar-correo"),
        direccion: fieldValue("agendar-direccion"),
        observaciones: fieldValue("observaciones"),
        tipoUso: state.tipoUso,
        color: state.color,
        talla: state.talla,
        pie: state.pie,
        receta: state.recetaNombre,
      };
      document.querySelectorAll("[data-review]").forEach(function (el) {
        var value = values[el.getAttribute("data-review")];
        el.innerHTML = value ? escapeHtml(value) : "—";
      });
    }

    function goTo(step) {
      current = step;
      if (stepCaption) stepCaption.textContent = STEP_LABELS[step];
      if (recetaWarning) recetaWarning.hidden = true;
      if (step === 3) renderReview();
      renderStepper();
      renderPanels();
      renderActions();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderResumenPaso1() {
      var map = {
        "summary-tipo": state.tipoUso,
        "summary-color": state.color,
        "summary-talla": state.talla || "—",
        "summary-pie": state.pie,
      };
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = map[id];
      });
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

    wirePillGroup('[data-field="tipo-uso"]', function (value) {
      state.tipoUso = value;
      renderResumenPaso1();
    });
    wirePillGroup('[data-field="color"]', function (value) {
      state.color = value;
      renderResumenPaso1();
    });

    var tallaSelect = document.getElementById("talla-select");
    if (tallaSelect) {
      tallaSelect.addEventListener("change", function () {
        state.talla = tallaSelect.value;
        renderResumenPaso1();
      });
    }
    var pieSelect = document.getElementById("pie-select");
    if (pieSelect) {
      pieSelect.addEventListener("change", function () {
        state.pie = pieSelect.value;
        renderResumenPaso1();
      });
    }

    var recetaInput = document.getElementById("receta-file");
    var recetaRow = document.getElementById("receta-file-row");
    var recetaName = document.getElementById("receta-file-name");
    var recetaRemove = document.getElementById("receta-file-remove");
    if (recetaInput) {
      recetaInput.addEventListener("change", function () {
        var file = recetaInput.files && recetaInput.files[0];
        if (!file) return;
        state.recetaNombre = file.name;
        if (recetaName) recetaName.textContent = file.name;
        if (recetaRow) recetaRow.hidden = false;
        if (recetaWarning) recetaWarning.hidden = true;
      });
    }
    if (recetaRemove) {
      recetaRemove.addEventListener("click", function () {
        state.recetaNombre = null;
        if (recetaInput) recetaInput.value = "";
        if (recetaRow) recetaRow.hidden = true;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        // La receta es obligatoria (la evaluación sin receta está "Próximamente").
        if (current === 2 && !state.recetaNombre) {
          if (recetaWarning) recetaWarning.hidden = false;
          return;
        }
        if (current < 3) goTo(current + 1);
      });
    }
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (current > 1) goTo(current - 1);
      });
    }
    document.querySelectorAll("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goTo(Number(btn.getAttribute("data-goto")));
      });
    });

    var pagarBtn = document.getElementById("pagar-btn");
    if (pagarBtn) {
      pagarBtn.addEventListener("click", function () {
        goTo(4);
      });
    }

    goTo(1);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
