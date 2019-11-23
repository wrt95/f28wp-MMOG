var express = require('express');
var router = express.Router();


/* GET home page. */
//Node.js code to connect to the database
var mysql  = require('mysql');
var con    =  mysql.createConnection({
  //the page hosting the server
  host     :  "sql2.freesqldatabase.com",
  //login details
  user     :  "sql2312550", 
  password :  "gR1*bG2*",
  //name of database
  database :  "sql2312550"
});
var name;


//newHighscore
//if score is greater than User.HIGHSCORE WHERE User.USERNAME = login.username
//update HIGHSCORE
//else pass



con.connect(function(err) {
  
  if (err) throw err;
  console.log("Connected!");

  var nameEx = "imSoCool"

  //const score = require('../public/javascripts/game');  need to get score from game.js

  //imports the username and password from homepage.js
  const login = require('../public/javascripts/homepage');
  //declares them as variables now to make code more readable in SQL queries
  var username = login.username;
  var password = login.password;
  console.log("Current Username:",username,", Current Password:",password)

  //retruns the username and scores of the the top 5 scores
  var LdrBrd   = "SELECT USERNAME AS Username, HIGHSCORE AS Highscore FROM User ORDER BY HIGHSCORE DESC LIMIT 5";
  //returns a user and pass from DB if they exist
  var validLogin = "SELECT USERNAME, PASS FROM User WHERE USERNAME = '"+username+"' AND PASS = '"+password+"'";
  //adds new user and pass to DB
  var sqlUpdateLogin = "INSERT INTO User (USERNAME, PASS) VALUES ('"+username+"','"+password+"')";
  //gets the current username
  var getName = "SELECT USERNAME FROM User WHERE USERNAME = '"+nameEx+"'";
  


  //https://stackoverflow.com/questions/47993499/return-boolean-value-from-mysql-in-nodejs

  function credentials(callback){
    //checks if the exact username and password are already in the DB
    //if true then it should print true
    con.query(validLogin, function (err, result) { 
      callback(err, result ? result.length > 0 : false);
      }); 
    }

  credentials(function(err, exists){
    if (err) throw err
    else {console.log("is valid username and password?",exists);}
      if(exists == false){
        console.log("new account pls")
      }
      else{
        console.log("YOU MAY ENTER")
      }
    })

  //for the new account function (TODO)
  function insertLogin(){
    //adds a new set of username and password to DB
    con.query(sqlUpdateLogin, function (err, result) {
      if (err) throw err;
      console.log("dsda",result) })
  } 

  //returns username
  con.query(getName, function(err, result, fields){
    if (err) throw err;
    name = Object.values(result[0]);
    console.log("name:",name[0])
  })
  //returns the tope 5 highscores
  con.query(LdrBrd, function (err, result, fields) {
    if (err) throw err;
    //made a variable leaderboard to send to index.jade and display as a table
    leaderboard = result;
    console.log("Leaderboard",result);
  })
})
//sending the previously mentioned leadeboard to index.jade
router.get('/', function(req, res, next) {
  console.log("Leaderboard:", leaderboard)
  res.render('index.jade', {ld: leaderboard});
});

function setName(){
//sends the current username to the gamepage.js and displays your user as you play
router.get('/gamepage', function(req, res, next) {
  console.log("usr:", name)
  res.render('gamepage', {ud: name});
});
}
setName()
module.exports = router;