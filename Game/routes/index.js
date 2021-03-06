var express = require('express');
var router = express.Router();


/*
************************
  DATABASE INFORMATION
************************
*/

var mysql = require('mysql');
var con =  mysql.createConnection({
  host     :  "sql2.freesqldatabase.com",
  user     :  "sql2312550", 
  password :  "gR1*bG2*",
  database :  "sql2312550"
});


//newHighscore
//if score is greater than User.HIGHSCORE WHERE User.USERNAME = login.username
//update HIGHSCORE
//else pass

/*
****************************
  CONNECTS TO THE DATABASE
****************************
*/

con.connect(function(err) {
  
  if (err) throw err;
  console.log("Connected!");

/*
********************************************
  GETS USERNAME AND PASSWORD FROM HOMEPAGE
********************************************
*/

  //imports the username and password from homepage.js
  const login = require('../public/javascripts/homepage');

  //declares them as variables
  var username = login.username;
  var password = login.password;
  console.log("Current Username:",username,", Current Password:",password)



  /*
  ***************
    SQL QUERIES
  ***************
  */


  //retruns the username and scores of the the top 5 scores
  var LdrBrd         = "SELECT USERNAME AS Username, HIGHSCORE AS Highscore FROM User ORDER BY HIGHSCORE DESC LIMIT 5";
  //returns a user and pass from DB if they exist
  var validLogin     = "SELECT USERNAME, PASS FROM User WHERE USERNAME = '"+username+"' AND PASS = '"+password+"'";
  //adds new user and pass to DB
  var sqlUpdateLogin = "INSERT INTO User (USERNAME, PASS) VALUES ('"+username+"','"+password+"')";
  //gets the current username
  var getName        = "SELECT USERNAME FROM User WHERE USERNAME = '"+username+"'";
  


  /*
  *********************
    CALLS THE QUERIES
  *********************
  */


  //compares the entered username and password to the database and says true/false
  //Stolen from:
    //https://stackoverflow.com/questions/47993499/return-boolean-value-from-mysql-in-nodejs
    
  var cred = {
  credentials: function credentials(callback){
    var rows = 0;
    con.query(validLogin, function (err, result) { 
      if (err) {
        callback(err, null);
        }
      else {
        rows += result.length;
        callback(null, rows > 0);
        }
      }); 
    },
  
  //calls the credentials function passing through the function as an argument

  f: function foo(){
    credentials(function(err, exists){
      if (err) throw err
      else {console.log("is valid username and password?",exists);}
        if(exists == false){
          console.log("new account pls")
        }
        else{
          console.log("YOU MAY ENTER")
          displayName()
        }
      })
    }
  }


  //adds a new set of username and password to DB

  var insertLogin = {
  //for the new account function
    isl : function insertLogin(){
      con.query(sqlUpdateLogin, function (err, result) {
        if (err) throw err;
        console.log("updated the DB with: ",result) })
    } 
  }
  module.exports= insertLogin

  //gets the current username

  function displayName(){
    con.query(getName, function(err, result, fields){
      if (err) throw err;
      //result is of type [object Object] where Object is the username we want
      //Object.values gets the data of type Object -> the username
      //this give use an array ['exampleUsername'] that we can pass through to gamepage.js as 
      //js knows what and array of string is
      name = Object.values(result[0]);
      console.log("name:",name)
      //express fun that sends it be rendered in gamepage.js
      setName()
    })
  }


  //returns the top 5 highscores

  con.query(LdrBrd, function (err, result, fields) {
    if (err) throw err;
    //made a variable leaderboard to send to index.jade and display as a table
    leaderboard = result;
    console.log("Leaderboard",result);
  })



  /*
  *********************
    Hashing functions
  *********************
  */


  //uses the hash-pass library to trun the password into a random string

  function hashPass(ps){
    var passwordHash = require('password-hash');
    var hashedPassword = passwordHash.generate(ps);
    console.log("hashpass",hashedPassword);
    console.log("verify hashed password",passwordHash.verify(ps, hashedPassword));
    }
  })



/* 
****************
  JADE EXPORTS 
****************
*/

//The router functions here get the .jade pages and render them in the localhost

//This function gets index.jade and renders it at the address localhost:3000/
router.get('/', function(req, res, next) {
  //the leaderboard of highscores is printed in the console when index.jade is rendered
  console.log("Leaderboard:", leaderboard)
  //At the variable ld in index.jade, the leaderboard is displayed
  res.render('index.jade', {ld: leaderboard});
});

//This function gets the instructions.jade page and renders it at the address localhost:3000/instructions
router.get('/instructions', function(req, res, next) {
  res.render('instructions.jade');
});

//Ths function gets the gamepage.jade file and renders it at the address localhost:3000/gamepage
router.get('/gamepage', function(req, res, next) {  
  res.render('gamepage.jade');
});



//sends the current username to the gamepage.js and displays your user as you play

function setName(){

}

  /*
  **************  
    JS EXPORTS
  **************
  */


module.exports =
  router

