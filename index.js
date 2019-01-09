require('dotenv').config();

const express = require('express');
const weatherCalculator = require('./server/weatherCalculator');

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use('/api/weather', function (req, res, next) {
    weatherCalculator.get().then(weather => {
        res.status(200).send(weather);
        next();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))