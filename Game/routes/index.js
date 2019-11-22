var express = require('express');
var router = express.Router();


/* GET home page. */
var mysql  = require('mysql');
var con    =  mysql.createConnection({
  host     :  "sql2.freesqldatabase.com",
  user     :  "sql2312550", 
  password :  "gR1*bG2*",
  database :  "sql2312550"
});
var name;


//newHighscore
//if score is greater than User.HIGHSCORE WHERE User.USERNAME = login.username
//update HIGHSCORE
//else pass

con.connect(function(err) {
  //const score = require('../public/javascripts/game');  need to get score from game.js
  const login = require('../public/javascripts/homepage');

  var username = login.username;
  var password = login.password;
  console.log(username, password)

  if (err) throw err;
  console.log("Connected!");
  //retruns the username and scores of the the top 5 scores
  var LdrBrd   = "SELECT USERNAME AS Username, HIGHSCORE AS Highscore FROM User ORDER BY HIGHSCORE DESC LIMIT 5";
  var validLogin = "SELCT USERNAME, PASS FROM USER WHERE USERNAME ='"+username+"' AND PASS ='"+password+"'";
  var validUser = "SELECT USERNAME FROM User WHERE USERNAME ='"+username+"'";
  var validPass = "SELECT PASS FROM User WHERE PASS ='"+password+"'";
  var sqlUpdateLogin = "INSERT INTO User (USERNAME, PASS) VALUES ('"+username+"','"+password+"')";

  function credentials(callback){
    //checks if the exact username is already in the DB
    //if true then it should print true
    con.query(validUser, function (err, result) {
      callback(err, result ? result.length > 0 : false);
    });
  }
  



  /*
  function credentialsUser(callback){
    //checks if the exact username is already in the DB
    //if true then it should print true
    con.query(validUser, function (err, result) {
      callback(err, result ? result.length > 0 : false);
    });
  }
  credentialsUser(function(err, isExists){
    if (err) throw err
  else {console.log("hey",isExists);}
  return isExists
  });

  function credentialsPass(callback){
    //checks if the exact password is already in the DB
    //if true then it should print true
    con.query(validPass, function (err, result) {
      callback(err, result ? result.length > 0 : false);
    });
  }
  credentialsPass(function(err, isExists){
    if (err) throw err
  else {console.log("hoy",isExists);}
  return isExists
  }); 
  */

  function isLogin() {
    //call back function that gives the bool value we are looking for
    credentials(function(err, isExists){
      if (err) throw err
      else {console.log("hay",isExists);}
      flag = isExists
      console.log(flag)
      return flag})
    //if true then the player has entered the correct username and password
    if(flag = true)
        console.log("correct cred")
    else
      console.log("make account or try again")
  }
  isLogin()


  /*
  function insertLogin(){
    //adds a new set of username and password to DB
    con.query(sqlUpdateLogin, function (err, result) {
      if (err) throw err;
      console.log("dsda",result) })
  } 
  */
  //returns the tope 5 highscores
  con.query(LdrBrd, function (err, result, fields) {
    if (err) throw err;
    leaderboard = result;
    console.log("Leaderboard",result);
  })
})

router.get('/', function(req, res, next) {
  console.log("Leaderboard:", leaderboard)
  res.render('index.jade', {ld: leaderboard});
});
router.get('/gamepage', function(req, res, next) {
  console.log("usr:", name)
  res.render('gamepage', {ud: name});
});

module.exports = router 