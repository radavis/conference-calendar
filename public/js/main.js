var scheduleToEvents = function(schedule, date) {
  // {
  //   id:
  //   title: 'All Day Event',
  //   start: '2016-06-01',
  //   end: ''
  // },

  var result = [];

  schedule.stages.forEach(function(stage) {
    stage.sessions.forEach(function(session) {
      var event = {
        id: session.id,
        title: session.talk.title + ' - ' + session.speaker.name,
        start: moment(date + 'T' + session.time_start).format(),
        end: moment(date + 'T' + session.time_end).format(),
        description: session.talk.description,
        room: session.room,
        stage: stage.name
      }
      result.push(event);
    })
  });

  return result;
}

var buildCalendar = function() {
  var date = window.location.pathname.split('/')[2];
  var dayOfWeek = moment(date).format('dddd');
  var request = $.get('/api/abstractions/schedule');

  request.done(function(response) {
    var schedule = response.days.find(function(object) {
      return object.name === dayOfWeek;
    });
    var events = scheduleToEvents(schedule, date);

    var fullCalendarObject = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: date,
      defaultView: 'agendaDay',
      editable: true,
      eventLimit: true,
      events: events
    }

    $('#calendar').fullCalendar(fullCalendarObject);
  });
}

$(document).ready(function() {
  buildCalendar();
});
