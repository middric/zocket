var socket = io.connect('http://198.199.67.216:8000');

socket.on('connect', function () {
  console.info('connected to statsd');
  socket.emit('subscribe', 'all');
});

// Retrieve all stats
socket.on('all', function (data) {
    var sum = 0;

    for(i; i < data.timers.revue.times.parsing.length; i++){
        sum += parseInt(data.timers.revue.times.parsing[i], 10);
    }

    if (sum) {
        $('.parsing span').text((sum / data.timers.revue.times.parsing.length) + 'ms');
    }
});