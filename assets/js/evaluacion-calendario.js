(function () {
  "use strict";

  /*
   * Calendario de evaluación profesional (agendar-plantilla.html, rama
   * "¿No tienes receta?"). Solo presentacional, sin backend, igual que el
   * resto de los formularios del sitio.
   *
   * La disponibilidad es PROVISORIA hasta integrar Reservo: lunes a viernes,
   * desde mañana hasta DAYS_AHEAD días, con los horarios de TIME_SLOTS.
   * Al conectar Reservo, este módulo es el único que hay que reemplazar.
   *
   * API: window.NexmedCalendario.create(root, { onChange(selection) })
   *   selection = { date: Date|null, time: string|null }
   *   devuelve { getSelection(), formatDate(date) }
   */
  var DAYS_AHEAD = 60;
  var TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00"];
  var LOCALE = "es-CL";

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function sameDay(a, b) {
    return !!a && !!b && a.getTime() === b.getTime();
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /* "jueves 6 de noviembre" */
  function formatDate(date) {
    return date.toLocaleDateString(LOCALE, { weekday: "long", day: "numeric", month: "long" });
  }

  function create(root, options) {
    var onChange = (options && options.onChange) || function () {};
    var today = startOfDay(new Date());
    var minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    var maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + DAYS_AHEAD);

    var view = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    var selection = { date: null, time: null };

    var monthLabel = root.querySelector("[data-cal-month]");
    var prevBtn = root.querySelector("[data-cal-prev]");
    var nextBtn = root.querySelector("[data-cal-next]");
    var grid = root.querySelector("[data-cal-grid]");
    var slotsWrap = root.querySelector("[data-cal-slots]");
    var slotsHint = root.querySelector("[data-cal-slots-hint]");

    function isAvailable(date) {
      var weekday = date.getDay();
      return date >= minDate && date <= maxDate && weekday !== 0 && weekday !== 6;
    }

    function emit() {
      onChange({ date: selection.date, time: selection.time });
    }

    function renderMonth() {
      monthLabel.textContent = capitalize(
        view.toLocaleDateString(LOCALE, { month: "long", year: "numeric" })
      );
      prevBtn.disabled =
        view.getFullYear() === minDate.getFullYear() && view.getMonth() === minDate.getMonth();
      nextBtn.disabled =
        view.getFullYear() === maxDate.getFullYear() && view.getMonth() === maxDate.getMonth();

      var year = view.getFullYear();
      var month = view.getMonth();
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      // Semana chilena: lunes primero (getDay: 0 = domingo).
      var leading = (new Date(year, month, 1).getDay() + 6) % 7;

      var html = "";
      for (var i = 0; i < leading; i++) {
        html += '<span class="cal__blank" aria-hidden="true"></span>';
      }
      for (var day = 1; day <= daysInMonth; day++) {
        var date = new Date(year, month, day);
        var available = isAvailable(date);
        var selected = sameDay(date, selection.date);
        var classes = "cal__day";
        if (selected) classes += " is-selected";
        if (sameDay(date, today)) classes += " is-today";
        html +=
          '<button type="button" class="' + classes + '" data-day="' + day + '"' +
          ' aria-label="' + formatDate(date) + (available ? "" : ", no disponible") + '"' +
          ' aria-pressed="' + selected + '"' +
          (available ? "" : " disabled") +
          ">" + day + "</button>";
      }
      grid.innerHTML = html;
    }

    function renderSlots() {
      if (!selection.date) {
        slotsWrap.innerHTML = "";
        slotsHint.hidden = false;
        return;
      }
      slotsHint.hidden = true;
      slotsWrap.innerHTML = TIME_SLOTS.map(function (time) {
        var selected = time === selection.time;
        return (
          '<button type="button" class="option-pill' + (selected ? " is-selected" : "") + '"' +
          ' data-time="' + time + '" aria-pressed="' + selected + '">' + time + "</button>"
        );
      }).join("");
    }

    grid.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-day]");
      if (!btn || btn.disabled) return;
      selection.date = new Date(view.getFullYear(), view.getMonth(), Number(btn.getAttribute("data-day")));
      selection.time = null;
      renderMonth();
      renderSlots();
      emit();
      // Mantener el foco en el día recién elegido tras re-renderizar la grilla.
      var focusTarget = grid.querySelector('[data-day="' + btn.getAttribute("data-day") + '"]');
      if (focusTarget) focusTarget.focus();
    });

    slotsWrap.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-time]");
      if (!btn) return;
      selection.time = btn.getAttribute("data-time");
      slotsWrap.querySelectorAll("[data-time]").forEach(function (el) {
        var isSel = el === btn;
        el.classList.toggle("is-selected", isSel);
        el.setAttribute("aria-pressed", String(isSel));
      });
      emit();
    });

    prevBtn.addEventListener("click", function () {
      view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
      renderMonth();
    });
    nextBtn.addEventListener("click", function () {
      view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      renderMonth();
    });

    renderMonth();
    renderSlots();

    return {
      getSelection: function () {
        return { date: selection.date, time: selection.time };
      },
      formatDate: formatDate,
    };
  }

  window.NexmedCalendario = { create: create };
})();
