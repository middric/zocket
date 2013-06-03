var socket = io.connect('http://198.199.67.216:8000'),
    elements = $('div[data-target]');

socket.on('connect', function () {
  console.info('connected to statsd');
  // subscribe per page
  socket.emit('subscribe', 'all');
});

// Retrieve all stats
socket.on('all', function (data) {
    elements.each(function () {
        var img = $('img', this),
            h = $('h1', this),
            target = $(this).data('target'),
            func = $(this).data('function'),
            unit = $(this).data('unit') || '',
            threshold = $(this).data('threshold') || Number.POSITIVE_INFINITY,
            cur = false,
            warning = false,
            val = 0, i = 0, sum = 0;

        h.removeClass('warning');

        if (cur = isset(data, target)) {
            if (cur.length && func != 'count') {
                for(i; i < cur.length; i++){
                    sum += cur[i];
                }
                val = Math.round(sum / cur.length);
                warning = (val > threshold);
                if (warning) {
                    h.addClass('warning');
                }
                h.text(val + unit);
            } else if (cur.length) {
                h.text(cur.length + unit);
            } else {
                h.text("0" + unit);
            }

            if (cur.store) {
                h.text(Object.keys(cur.store).length + unit);
            }
        }
        if (warning) {
            img.removeAttr('src').attr('src', 'http://198.199.67.216:8080/render/?target=stats.' + target + '.' + func + '&from=-10minutes&graphOnly=1&lineMode=connected&lineWidth=2&width=' + img.width() + '&height=50&template=zockets_warning');
        } else {
            img.removeAttr('src').attr('src', 'http://198.199.67.216:8080/render/?target=stats.' + target + '.' + func + '&from=-10minutes&graphOnly=1&lineMode=connected&lineWidth=2&width=' + img.width() + '&height=50&template=zockets');

        }
    });
});

function isset(obj, propStr) {
    var parts = propStr.split(".");
    var cur = obj;
    for (var i=0; i<parts.length; i++) {
        if (!cur[parts[i]])
            return false;
        cur = cur[parts[i]];
    }
    return cur;
}