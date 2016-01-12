var express = require('express');
var router = express.Router();
var UserDbService = require('../services/user-db');
var utils = require('../utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
