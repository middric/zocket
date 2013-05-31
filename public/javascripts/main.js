var socket = io.connect('http://198.199.67.216:8000');

socket.on('connect', function () {
  console.info('connected to statsd');
  // subscribe per page
  socket.emit('subscribe', 'all');
});

// Retrieve all stats
socket.on('all', function (data) {
    console.log(data);
    var sum = 0, i = 0;

    if (isset(data, 'timers.bbc.tviplayer.iplayer.index.render_time')) {
        for(i; i < data.timers.bbc.tviplayer.iplayer.index.render_time.length; i++){
            sum += data.timers.bbc.tviplayer.iplayer.index.render_time[i];
        }
        if (sum) {
            $('.parsing h1').text(Math.round(sum / data.timers.bbc.tviplayer.iplayer.index.render_time.length) + 'ms').stop().fadeTo(1, 1).fadeTo(10000, 0.25);
        }
    }

    if (isset(data, 'timers.bbc.tviplayer.iplayer.index.page_assembly_time')) {
        sum = 0;
        for(i; i < data.timers.bbc.tviplayer.iplayer.index.page_assembly_time.length; i++){
            sum += data.timers.bbc.tviplayer.iplayer.index.page_assembly_time[i];
        }
        if (sum) {
            $('.generation h1').text(Math.round(sum / data.timers.bbc.tviplayer.iplayer.index.page_assembly_time.length) + 'ms').stop().fadeTo(1, 1).fadeTo(10000, 0.25);
        }
    }

    if (isset(data, 'sets.bbc.tviplayer.iplayer.index.unique_browsers.store')) {
        var uniques = _.keys(data.sets.bbc.tviplayer.iplayer.index.unique_browsers.store).length;

        if (uniques) {
            $('.uniques h1').text(uniques).stop().fadeTo(1, 1).fadeTo(10000, 0.25);
        }
    }
});

function isset(obj, propStr) {
    var parts = propStr.split(".");
    var cur = obj;
    for (var i=0; i<parts.length; i++) {
        if (!cur[parts[i]])
            return false;
        cur = cur[parts[i]];
    }
    return true;
}