var express = require('express');
var router = express.Router();
var passport = require('passport');
var utils = require('../utils');
var UserDbService = require('../services/user-db');

module.exports = router;

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
  var erros = [];

  // code to be used in the API
  // try {
  //   newUser = {
  //     name: req.body.name,
  //     username: req.body.username,
  //     password: req.body.password,
  //   };
  //   utils.checkProperties(newUser);
  // } catch (e) {
  //   res.status(400).json({ error : e }); // Bad Request
  //   return;
  // }
  UserDbService.add(newUser, function(err, result){
    // code to be used in the API
    // if(err){
    //   res.status(500).json({ error : err }); // Internal Server Error
    //   return;
    // }

    passport.authenticate('local')(req, res, function () {
      //res.redirect('/');
      res.redirect(302, '/app');
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

// Helpers

function getUserAndValidate(req){
  var errors = [];
  var newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  for (var prop in newUser) {
    if(newUser[prop] !== undefined) continue;
    else errors.push({ message : 'The field ' +userFieldToString(prop) + ' is required.' });
  }
  if(errors.length > 0) return errors;

  // specific validations
}

function userFieldToString(field){
  if(field == 'name'){
    return 'Name';
  }else if(field == 'username'){
    return 'Email';
  }else if(field == 'password'){
    return 'Password';
  }

  return field;
}
