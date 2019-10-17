import mysql from 'mysql';

var con = mysql.createConnection({
    host: "localhost",
    user: "agm6",
    password: "7s4RlYr7Eh"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});