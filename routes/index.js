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
    res.render('register', { errors : req.query.errors});
});

/* POST register page. */
router.post('/register', function(req, res) {
  var newUser = getUserFromReq(req);
  var errors = validateUser(newUser);
  if(errors){
    var errorsString = encodeURIComponent(errors);
    return res.redirect(302, '/register?errors=' +errorsString);
  }

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
    if(err){
      return res.render('register', { errors: [err.defaultMessage] });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect(302, '/app');
      return;
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
function getUserFromReq(req){
  return {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
}
function validateUser(newUser){
  var errors = [];

  if(newUser.name === undefined || newUser.name.length === 0){
    errors.push({ message : 'The field ' + 'Name' + ' is required.' });
    return errors;
  }
  // password validation
  if(newUser.password === undefined || newUser.password.length === 0){
    errors.push({ message : 'The field ' + 'Password' + ' is required.' });
    return errors;
  }
  // username validation
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(newUser.username === undefined ){
    errors.push({ message : 'The field ' + 'Email' + ' is required.' });
    return errors;
  }
  else if( !emailRegex.test(newUser.username)){
    errors.push({ message : 'The field ' + 'Email' + ' is invalid.' });
    return errors;
  }

  return null;
}
