var socket = io.connect('http://198.199.67.216:8000');

socket.on('connect', function () {
  console.info('connected to statsd');
  socket.emit('subscribe', 'all');
});

// Retrieve all stats
socket.on('all', function (data) {
  $('.log').append('<p>' + JSON.stringify(data) + '</p>');
  var sum = 0;
  for(var i = 0; i < data.timers.revue.times.parsing.length; i++){
    sum += parseInt(data.timers.revue.times.parsing[i]);
  }
  $('.parsing span').text((sum / data.timers.revue.times.parsing.length) + 'ms');
});

