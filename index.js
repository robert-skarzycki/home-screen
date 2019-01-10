require('dotenv').config();

const express = require('express');
const weatherCalculator = require('./server/weatherCalculator');
const pollutionMeasurer = require('./server/pollutionMeasurer');
const weatherForecast = require('./server/weatherForecast');


const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use('/api/weather', function (req, res, next) {
    weatherCalculator.get().then(weather => {
        res.status(200).send(weather);
        next();
    });
});

app.use('/api/pollution', function (req, res, next) {
    pollutionMeasurer.getPollutionData().then(pollutionData => {
        res.status(200).send(pollutionData);
        next();
    });
});

app.use('/api/forecast-url', function (req, res, next) {
    weatherForecast.getImageUrl().then(imageData => {
        res.status(200).send({ imageData: imageData });
        next();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))