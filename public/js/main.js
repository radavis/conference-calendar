var parseTime = function(hhmm) {
  var hhmm = hhmm.toString();
  var hour = hhmm.substr(0, 2);
  var minute = hhmm.substr(2, 2);
  return hour + ':' + minute;
}

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
      var title = session.talk.title + '\n';
      title += 'by ' + session.speaker.name + '\n';
      title += 'on ' + stage.name;
      var event = {
        id: session.id,
        title: title,
        start: moment(date + 'T' + parseTime(session.time_start)).format(),
        end: moment(date + 'T' + parseTime(session.time_end)).format(),
        description: session.talk.description,
        room: session.room,
        stage: stage.name
      }
      console.log(session.time_start);
      console.log(event.start);
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
      minTime: "09:00:00",
      maxTime: "22:00:00",
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
