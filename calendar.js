document.addEventListener('DOMContentLoaded', function() {
  // Select the calendar element by ID.
  let calendarEl1 = document.getElementById('calendar-view1');
  let calendarEl2 = document.getElementById('calendar-view2');

  // Initiate the Calendar, we can initiate
  // as many calendars as needed, each one with
  // their own individual events.
  let calendar1 = new FullCalendar.Calendar(calendarEl1, calendarFuncs.getCfg(calendarFuncs.getDemoEvents()) );
  let calendar2 = new FullCalendar.Calendar(calendarEl2, calendarFuncs.getCfg(calendarFuncs.getDemoEvents()) );
  
  // Render the Calendar
  calendar1.render();
  calendar2.render();

  calendarFuncs.init([calendar1, calendar2]);

});

// Defines the Calendar Configuration.
let calendarFuncs = (function() {
  let getCfg = function(events) {
    return {
      headerToolbar: {
        start: '',
        center: '',
        end: '',
      },
      height: 'auto',
      weekends: false,
      allDaySlot: false,
      eventTimeFormat: {
        hour: 'numeric',
        minute: 'numeric',
        meridiem: 'short',
        hour12: true,
      },
      eventColor: '#3d8ec7',
      eventOrder: 'title,start,-duration',
      initialView: 'timeGridWeek',
      dayHeaderFormat: { weekday: 'long' },
      slotDuration: '00:30:00',
      slotMinTime: '09:00:00',
      slotMaxTime: '22:00:00',
      events: events,
      // Renders the event having the Title on the first row, and the time interval on the second row.
      // If the event contains the text `Not Available` then hide the time interval
      eventContent: function (arg, createElement) {
        let html = `<div class="fc-event-title-container"><div class="fc-event-title fc-sticky">${ arg.event._def.title }</div>`;
        if (arg.event._def.title != 'Not Available') {
          html += `</div><div class="fc-event-time">${ arg.timeText }</div>`;
        }
        return { html:  html};
      }
    }
  }

  // Events demo data.
  let getDemoEvents = function() {
    return [
      {
        id: '1',
        title: 'Mathematics',
        daysOfWeek: [1],
        startTime: '10:00',
        endTime: '11:00',
        backgroundColor: '#0772bb'
      },
      {
        id: '2',
        title: 'Science',
        daysOfWeek: [1],
        startTime: '10:00',
        endTime: '11:00'
      },
      {
        id: '3',
        title: 'Social Studies',
        daysOfWeek: [1],
        startTime: '15:30',
        endTime: '16:30'
      },
      {
        id: '4',
        title: 'English',
        daysOfWeek: [3],
        startTime: '17:00',
        endTime: '18:00'
      },
      {
        id: '5',
        title: 'Fine Arts',
        daysOfWeek: [2],
        startTime: '19:00',
        endTime: '20:00'
      },
      {
        id: '5',
        title: 'Not Available',
        daysOfWeek: [5],
        startTime: '09:00',
        endTime: '21:00',
        backgroundColor: '#cd7b18',
      },
    ]
  }

  let clickEvents = function(calendars) {
    // Change calendars view
    $('.group-by-js').on('change', function() {
      let listView = 'timeGridWeek';

      if ($(this).val() == 'scheldue') {
        listView = 'listWeek';
        $('.calendar-title.schedule').addClass('d-none');
        $('.calendar-title.group-by').removeClass('d-none');
      } else {
        $('.calendar-title.schedule').removeClass('d-none');
        $('.calendar-title.group-by').addClass('d-none');
      }
      for (var calendar of calendars) {
        calendar.changeView(listView);
      }
    });
  }

  let init = (calendars) => {
    clickEvents(calendars);
  }

  return {
    getCfg: getCfg,
    getDemoEvents: getDemoEvents,
    init: init,
  }
}());