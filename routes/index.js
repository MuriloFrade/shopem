var express = require('express');
var router = express.Router();
var passport = require('passport');
var utils = require('../utils');
var UserDbService = require('../services/user-db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user : req.user });
});

/* GET register page. */
router.get('/register', function(req, res) {
    res.render('register', { });
});

/* POST register page. */
router.post('/register', function(req, res) {
  var newUser = null;
  try {
    newUser = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
    utils.checkProperties(newUser);
  } catch (e) {
    res.status(400).json({ error : e }); // Bad Request
    return;
  }
  UserDbService.add(newUser, function(err, result){
    if(err){
      res.status(500).json({ error : err }); // Internal Server Error
      return;
    }
    passport.authenticate('local')(req, res, function () {
      //res.redirect('/');
      res.status(201).json(result);
    });

  });

});

/* GET login page. */
router.get('/login', function(req, res) {
    res.render('login', { });
});

/* POST login page. */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect(302, '/app');
});


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect(302, '/login');
});

module.exports = router;
