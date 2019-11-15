var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.jade');
});

router.get('/gamepage', function(req, res, next) {
  res.render('gamepage');
});

module.exports = router;
