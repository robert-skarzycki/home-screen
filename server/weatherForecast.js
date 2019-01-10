const moment = require('moment');
const fetch = require('fetch-base64')

const WeatherForecast = function () {
    const self = this;

    const getImageUrl = function () {
        const formattedDate = moment(new Date()).format('YYYYMMDD00');
        const imageUrl = `http://www.meteo.pl/um/metco/mgram_pict.php?ntype=0u&fdate=${formattedDate}row=436&col=181&lang=pl`;
        return fetch.remote(imageUrl).then(imageData => `data:image/png;base64,${imageData[0]}`);
    };

    return {
        getImageUrl: getImageUrl
    };
};

module.exports = new WeatherForecast();