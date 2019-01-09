$(function () {
    var $container = $('div[current-temperature]');
    $.getJSON('/api/weather').then(function (data) {
        $container.text(data.temperature);
    });
});