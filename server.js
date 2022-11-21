const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const data = require('./country.json');
const dataCode = require('./dataCode.json');
const dataCountry = require('./dataCountry.json');

PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/getAll', (req, res) => {
    return res.status(200).json({
        RespCode: 200,
        RespMessage: 'success',
        Result: data
    });
})

//getCountryCode
app.get('/api/getCallingCode/:coun', (req, res) => {
    let coun = req.params.coun;
    
    if (!coun) {
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad: Invalid data',
            Log: 2
        })
    }
    if (dataCountry[capitalizeFirstLetter(coun)]) {
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'success',
            Result: dataCountry[capitalizeFirstLetter(coun)]
        });
    }
    else {
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad: not found data',
            Log: 1
        })
    }
})

//get by code
app.get('/api/getCountry/:coun_code', (req, res) => {
    let coun_code = req.params.coun_code;

    if (!coun_code) {
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad: Invalid data',
            Log: 2
        })
    }
    if (dataCode[coun_code]) {
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'success',
            Result: dataCode[coun_code]
        });
    }
    else {
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad: not found data',
            Log: 1
        })
    }
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

module.exports = app;
