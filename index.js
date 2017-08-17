const express = require('express');
const app = express();
const db = require('./db.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/cities', function(req, res){
    db.getCitiesInCountry('GBR', function(rows){
        res.send(rows);
        console.log('Request processed: ');
    });
});

app.post('/city', function(req, res){
    const cityID = req.body.cityID;
    const cityPop = req.body.cityPop;

    if(cityID && cityPop){
        db.updateCityPop(cityID, cityPop, function(message){
            res.send(message);
        });
    }
});

app.listen(8002, function() {
    console.log('World API listening on port 8002..');
});