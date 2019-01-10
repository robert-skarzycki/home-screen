$(function () {
    var getTemperature = function () {
        var $container = $('div[current-temperature]');
        $.getJSON('/api/weather').then(function (data) {
            $container.html(data.temperature + '&#x2103;');
        });
    };

    var getPollution = function () {
        var $container = $('div[current-pollution]');
        $.getJSON('/api/pollution').then(function (data) {
            $container.css('background-color', data.color);
            $container.html('<p>' + data.description + '</p><p><i>' + data.advice + '</i></p>');
        });
    };

    var getWeatherForecast = function () {
        var $imageContainer = $('img[weather-forecast]');

        $.getJSON('/api/forecast-url').then(function (data) {
            $imageContainer.attr('src', data.imageData);
        });
    };

    getTemperature();
    getPollution();
    getWeatherForecast();
});