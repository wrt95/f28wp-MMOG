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
  const login = require('../public/javascripts/homepage');
  //const score = require('../public/javascripts/game');

  if (err) throw err;
  console.log("Connected!");
  //retruns the username and scores of the the top 5 scores
  var LdrBrd   = "SELECT USERNAME AS Username, HIGHSCORE AS Highscore FROM User ORDER BY HIGHSCORE DESC LIMIT 5";

  //returns the username they entered in the login field
  var usr  = "SELECT USERNAME AS Username FROM User WHERE USERNAME = '"+login.username+"'"; 


  //var CnVis    = "SELECT VISIBLE AS Visible, COIN_ID AS CoinNum, COIN_X AS X, COIN_Y AS Y FROM Coins WHERE Coins.VISIBLE = 1";
  //var CnInvis  = "SELECT VISIBLE AS Visible, COIN_ID AS CoinNum, COIN_X AS X, COIN_Y AS Y FROM Coins WHERE Coins.VISIBLE = 0";
  
  var sqlUpdate = "INSERT INTO User (USERNAME, PASS, HIGHSCORE) VALUES ('"+login.username+"','"+login.password+"','121')";
  //var sqlUpdate = "INSERT INTO User (USERNAME, PASS, HIGHSCORE) VALUES ('"+login.username+"','"+login.password+"','"+score+"')";


  con.query(sqlUpdate, function (err, result) {
    if (err) throw err;
  });
 con.query(LdrBrd, function (err, result, fields) {
    if (err) throw err;
    leaderboard = result;
    console.log("Leaderboard",result);
  });
  con.query(usr, function (err, result, fields) {
    if (err) throw err;
    name = result;
    console.log("user",result);
  });
});

router.get('/', function(req, res, next) {
  console.log("Leaderboard:", leaderboard)
  res.render('index.jade', {ld: leaderboard});
});
router.get('/gamepage', function(req, res, next) {
  console.log("usr:", name)
  res.render('gamepage', {ud: name});
});

module.exports = router;