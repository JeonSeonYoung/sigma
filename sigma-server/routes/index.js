var express = require('express');
var router = express.Router();

const register = require('./register');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/register', register);    //  /api/register/~~~

module.exports = router;
