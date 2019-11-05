const mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql2.freesqldatabase.com",
    user: "sql2310710",
    password: "aK1!vU9*",
    database: "sql2310710"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});