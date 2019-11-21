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
var usr;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //var LdrBrd   = "SELECT Users.USERNAME AS Username, Scores.HIGHSCORE AS Highscore, Scores.GAMES_PLAYED AS Games_Played FROM Users JOIN Scores ON Users.USER_ID = Scores.USER_ID ORDER BY HIGHSCORE DESC LIMIT 5";
  var CnVis    = "SELECT VISIBLE AS Visible, COIN_ID AS CoinNum, COIN_X AS X, COIN_Y AS Y FROM Coins WHERE Coins.VISIBLE = 1";
  var CnInvis  = "SELECT VISIBLE AS Visible, COIN_ID AS CoinNum, COIN_X AS X, COIN_Y AS Y FROM Coins WHERE Coins.VISIBLE = 0";
  
  var highscore = "SELECT HIGHSCORE FROM Scores"
  var sqlUpdate = "UPDATE Scores.HIGHSCORE = ?"
  /*
  con.query(UsrScore, function (err, result, fields) {
    if (err) throw err;
    NameScore = result;
    console.log("User Scores",result);
  */
 
 con.query(highscore, function(err, result, fields) {
  if (err) throw err;
  console.log("Inserted");
 });
});

router.get('/', function(req, res, next) {
  console.log("Leaderboard:", leaderboard)
  res.render('index.jade', {ld: leaderboard});
});
router.get('/gamepage', function(req, res, next) {
  console.log("Score", hgscr)
  res.render('gamepage.jade', {hgscr})  
});

router.get('/gamepage', function(req, res, next) {
  console.log("usr:", NameScore)
  res.render('gamepage', {ud: NameScore});
});

module.exports = router;  

