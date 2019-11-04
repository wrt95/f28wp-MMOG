import mysql from 'mysql';

var con = mysql.createConnection({
    host: "mysql-server-1.macs.hw.ac.uk",
    user: "agm6",
    password: "7s4RlYr7Eh",
    database: "agm6"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});