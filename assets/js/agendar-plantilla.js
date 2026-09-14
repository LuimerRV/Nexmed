(function () {
  "use strict";

  var STEP_LABELS = {
    1: "5.1 Configuración de la plantilla",
    2: "5.2 Carga de la receta médica",
    3: "5.3 Agendamiento y pago anticipado",
    4: "5.4 Confirmación",
  };
  var WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  function init() {
    var current = 1;
    var state = {
      tipoUso: "Deportivo",
      talla: "",
      pie: "Ambos",
      recetaNombre: null,
      recetaEvaluacion: false,
    };

    var stepCaption = document.getElementById("agendar-step-label");
    var stepperSteps = document.querySelectorAll("#agendar-stepper .stepper-step");
    var panels = document.querySelectorAll("[data-step-panel]");
    var actionsBar = document.getElementById("agendar-actions");
    var backBtn = document.getElementById("btn-back");
    var nextBtn = document.getElementById("btn-next");
    var recetaWarning = document.getElementById("receta-warning");

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
      nextBtn.hidden = current === 3;
    }

    function goTo(step) {
      current = step;
      if (stepCaption) stepCaption.textContent = STEP_LABELS[step];
      if (recetaWarning) recetaWarning.hidden = true;
      renderStepper();
      renderPanels();
      renderActions();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderResumenPaso1() {
      var elTipo = document.getElementById("summary-tipo");
      var elTalla = document.getElementById("summary-talla");
      var elPie = document.getElementById("summary-pie");
      if (elTipo) elTipo.textContent = state.tipoUso;
      if (elTalla) elTalla.textContent = state.talla || "—";
      if (elPie) elPie.textContent = state.pie;
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
    wirePillGroup('[data-field="horario"]', function () {});

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
    var evaluacionBtn = document.getElementById("agendar-evaluacion-btn");
    if (evaluacionBtn) {
      evaluacionBtn.addEventListener("click", function () {
        state.recetaEvaluacion = true;
        goTo(3);
      });
    }

    var calendarDays = document.getElementById("calendar-days");
    if (calendarDays) {
      var today = new Date();
      var html = "";
      for (var i = 1; i <= 14; i++) {
        var d = new Date(today);
        d.setDate(today.getDate() + i);
        html +=
          '<button type="button" class="plantilla-calendar__day' +
          (i === 1 ? " is-selected" : "") +
          '" data-day="' +
          i +
          '">' +
          '<span class="plantilla-calendar__day-weekday">' + WEEKDAYS[d.getDay()] + "</span>" +
          '<span class="plantilla-calendar__day-number">' + d.getDate() + "</span>" +
          "</button>";
      }
      calendarDays.innerHTML = html;
      calendarDays.querySelectorAll(".plantilla-calendar__day").forEach(function (btn) {
        btn.addEventListener("click", function () {
          calendarDays.querySelectorAll(".plantilla-calendar__day").forEach(function (b) {
            b.classList.remove("is-selected");
          });
          btn.classList.add("is-selected");
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (current === 2 && !state.recetaNombre && !state.recetaEvaluacion) {
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
