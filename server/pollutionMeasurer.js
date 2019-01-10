const axios = require('axios');

const PollutionMeasurer = function () {
    const self = this;

    const getPollutionData = function () {
        const apiKey = process.env.RS_AIRLY_KEY;
        const homeLat = process.env.RS_HOME_LAT;
        const homeLon = process.env.RS_HOME_LON;

        const config = {
            headers: {
                'Accept': 'application/json',
                'apikey': apiKey,
                'Accept-Language': 'pl-PL'
            }
        }

        return axios.get(`https://airapi.airly.eu/v2/measurements/nearest?lat=${homeLat}&lng=${homeLon}`, config)
            .then(result => {
                const measurement = result.data;
                const indexValue = measurement.current.indexes[0];
                return indexValue;
            })
            .catch(err => console.log(err));
    };

    return {
        getPollutionData: getPollutionData
    };
};

module.exports = new PollutionMeasurer();