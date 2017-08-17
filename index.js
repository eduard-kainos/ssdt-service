const express = require('express');
const app = express();
const db = require('./db.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

/*app.post('/login', function(req, res) {

} */

app.get('/emps', function(req, res){
    db.getEmployeesInDept('1', function(rows){
        res.send(rows);
        console.log('Request processed: ');
    });
});

app.post('/new', function(req, res){
    const name = req.body.name;
    const departmentID = req.body.departmentID;
    const address = req.body.address;
    const nin = req.body.nin;
    const bankNo = req.body.bankNo;
    const startingSalary = req.body.startingSalary;

    if(name && departmentID && address && nin && bankNo && startingSalary){
        db.newEmployee(name, departmentID, address, nin, bankNo, startingSalary, function(message){
            res.send(message);
        });
    }
});

app.listen(8002, function() {
    console.log('ssdt-express listening on port 8002..');
});