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

var leaderboard;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var UsrScore = "SELECT Users.USER_ID AS usrID, Users.USERNAME AS Username, Scores.score AS Score FROM Users JOIN Scores ON Scores.USER_ID = Users.USER_ID ORDER BY SCORE DESC";
  var LdrBrd   = "SELECT Users.USERNAME AS Username, Scores.HIGHSCORE AS Highscore, Scores.GAMES_PLAYED AS Games_Played FROM Users JOIN Scores ON Users.USER_ID = Scores.USER_ID ORDER BY HIGHSCORE DESC LIMIT 5";
  var CnVis    = "SELECT VISIBLE AS Visible, COIN_ID AS CoinNum, COIN_X AS X, COIN_Y AS Y FROM Coins WHERE Coins.VISIBLE = 1";
  var CnInvis  = "SELECT VISIBLE AS Visible, COIN_ID AS CoinNum, COIN_X AS X, COIN_Y AS Y FROM Coins WHERE Coins.VISIBLE = 0";
  // need to make functions to check if username is already in use and to generate a new user_id (if their name isn't taken)
  //var insert   = "INSERT INTO Users (USERNAME, USER_ID) VALUES ('far', '117')"
  //var insertS  = "INSERT INTO Scores (USER_ID, SCORE, HIGHSCORE) VALUES('110', '8','9')"
  con.query(UsrScore, function (err, result, fields) {
    if (err) throw err;
    console.log("User Scores",result);
  });
  con.query(LdrBrd, function (err, result, fields) {
    if (err) throw err;
    leaderboard = result;
    console.log("Leaderboard",result);
  });
  con.query(CnVis, function (err, result, fields) {
    if (err) throw err;
    console.log("Visible Coins",result);
  });
  con.query(CnInvis, function (err, result, fields) {
    if (err) throw err;
    console.log("Invisible Coins",result);
  });
  /*con.query(insert, function (err, result) {
    if (err) throw err;
    console.log("Inserted");
  });
  con.query(insertS, function (err, result) {
    if (err) throw err;
    console.log("Inserted");
  });
  */
  con.query(UsrScore, function (err, result, fields) {
    if (err) throw err;
    for(i=0; i<result.length; i++)
      console.log("User Scores",result[i]);
  });
});

router.get('/', function(req, res, next) {
  console.log("Leaderboard:", leaderboard)
  res.render('index.jade', {ld: leaderboard});
});

router.get('/gamepage', function(req, res, next) {
  res.render('gamepage.jade');
});

router.get('/instructions', function(req, res, next) {
  res.render('instructions.jade');
});

module.exports = router;
