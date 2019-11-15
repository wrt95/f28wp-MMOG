var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.jade');
});

<<<<<<< HEAD
router.get('/', function(req, res, next) {
=======
router.get('/gamepage', function(req, res, next) {
>>>>>>> 747722e26e07072a6ede2c65c5e79ecaf24f218b
  res.render('gamepage');
});

module.exports = router;
