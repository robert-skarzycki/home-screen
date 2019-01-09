const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use('/api/weather', function (req, res) {
    res.status(200).send({
        temperature: -3.1
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))