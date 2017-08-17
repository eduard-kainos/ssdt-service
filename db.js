const mysql = require('mysql');
const config = require('./config.json');

var db;

/* const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: 'ssdtdb'
}); */

/* db.connect(function (err) {
    if(err) throw err;
    console.log("Connected to mysql.");
}); */

exports.login = function (username, password, callback){
    console.log("logging in'");
    db = mysql.createConnection({
        host: "localhost",
        user: username,
        password: password,
        database: 'ssdtdb'
    });

    db.connect(function (err) {
        if(err) throw err;
        callback("Logged in.");
    });
}

exports.getEmployeesInDept = function (departmentID, callback){
    db.query(
        "SELECT name FROM employee WHERE `DepartmentID` = ?" +
        "LIMIT 10",
        [departmentID],
        function(err, rows){
            if(err) throw err;
            callback(rows);
        }
    );
};

exports.newEmployee = function (name, departmentID, address, nin, bankNumber, startingSalary, callback){
    db.query(
        "INSERT INTO `employee` (`Name`, `DepartmentID`, `Address`, `NIN`, `BankNumber`, `StartingSalary`) "
        + "VALUES ('?','?','?','?','?',?)",
        [name, departmentID, address, nin, bankNumber, startingSalary],
        function(err){
            if(err) throw err;
            callback("Update successful.");
        }
    );
};