const axios = require('axios');
const qs = require('querystring');

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request)
//     return request
// })

const WeatherCalculator = function () {
    const self = this;

    const getCurrentWeather = function () {
        return getToken()
            .then(token =>
                getMeasures(token).then(temperature => {
                    return { temperature };
                }
                ))
            .catch(err => console.log(err));
    };

    const getMeasures = function (token) {
        const latNe = process.env.RS_NETATMO_LAT_NE;
        const lonNe = process.env.RS_NETATMO_LON_NE;
        const latSw = process.env.RS_NETATMO_LAT_SW;
        const lonSw = process.env.RS_NETATMO_LON_SW;

        return axios.get('https://api.netatmo.com/api/getpublicdata',
            {
                params: {
                    access_token: token,
                    lat_ne: latNe,
                    lon_ne: lonNe,
                    lat_sw: latSw,
                    lon_sw: lonSw,
                    filter: true,
                    required_data: 'temperature'
                }
            })
            .then(response => {
                const locations = response.data.body;
                const measuresData = locations.map(l => {
                    const entries = Object.entries(l.measures);
                    return entries.map(([key, value]) => value);
                });

                const temperatureMeasures = measuresData.reduce((a, b) => a.concat(b)).map(m => {
                    if (!m.type) {
                        return undefined;
                    }

                    var temperatureMeasureIndex = m.type.indexOf('temperature');
                    if (temperatureMeasureIndex < 0) {
                        return undefined;
                    }

                    var resourceEntries = Object.entries(m.res);
                    var resources = resourceEntries.map(([key, value]) => value);
                    if (resources.length == 0) {
                        return undefined;
                    }
                    else {
                        return resources[0][temperatureMeasureIndex];
                    }
                }).filter(tm => tm != undefined);

                if (temperatureMeasures.length > 0) {
                    return temperatureMeasures[0];
                }
                else {
                    return "?";
                }
            });
    };

    const getToken = function () {
        if (self.token) {
            return Promise.resolve(self.token);
        }
        else {
            return getFreshToken().then(token => {
                self.token = token;
                return token;
            });
        }
    }

    const getFreshToken = function () {
        const username = process.env.RS_NETATMO_USERNAME;
        const clientId = process.env.RS_NETATMO_CLIENTID_TEST1;
        const clientSecret = process.env.RS_NETATMO_CLIENTSECRET_TEST1;
        const password = process.env.RS_NETATMO_PASSWORD;

        const requestBody = {
            grant_type: 'password',
            username: username,
            password: password,
            client_secret: clientSecret,
            client_id: clientId
        };

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return axios.post('https://api.netatmo.com/oauth2/token',
            qs.stringify(requestBody), config)
            .then(result => {
                return result.data.access_token;
            });
    };

    return {
        get: getCurrentWeather
    };

};

module.exports = new WeatherCalculator();