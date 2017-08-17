const mysql = require('mysql');
const config = require('./config.json');

const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: 'world'
});

db.connect(function (err) {
    if(err) throw err;
    console.log("Connected to mysql.");
});

exports.getCitiesInCountry = function (countrycode, callback){
    db.query(
        "SELECT id, name, countrycode, district, population " +
        "FROM city " +
        "WHERE CountryCode = ? " +
        "LIMIT 10",
        [countrycode],
        function(err, rows){
            if(err) throw err;
            callback(rows);
        }
    );
};

exports.updateCityPop = function (cityID, cityPop, callback){
    db.query(
        "UPDATE city " +
        "SET Population = ? " +
        "WHERE ID = ?",
        [cityPop, cityID],
        function(err){
            if(err) throw err;
            callback("Update successful.");
        }
    );
};