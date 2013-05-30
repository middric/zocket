var socket = io.connect('http://198.199.67.216:8000');

socket.on('connect', function () {
  console.info('connected to statsd');
  socket.emit('subscribe', 'all');
});

// Retrieve all stats
socket.on('all', function (data) {
    var sum = 0, i = 0;
    console.log(data.timers.revue.times.parsing);

    for(i; i < data.timers.revue.times.parsing.length; i++){
        sum += data.timers.revue.times.parsing[i];
    }

    if (sum) {
        $('.parsing h1').text(Math.round(sum / data.timers.revue.times.parsing.length) + 'ms');
    }
});