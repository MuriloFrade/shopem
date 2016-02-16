var express = require('express');
var router = express.Router();
var UserDbService = require('../services/user-db');
var utils = require('../utils');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('app', { layout: false, user : req.user });
});


/* GET the current user logged. */
router.get('/user', function(req, res, next) {
  res.json(userDbToVm(req.user));
});

/* update the name and username of the current user logged. */
router.put('/user', function(req, res, next) {
  var userFieldsToUpdate = null;
  var userToUpdate = req.user;
  try {
    userFieldsToUpdate = { name: req.body.name, username: req.body.username };
    utils.checkProperties(userFieldsToUpdate);
    userToUpdate.name = userFieldsToUpdate.name;
    userToUpdate.username = userFieldsToUpdate.username;
  } catch (e) {
    return res.status(400).json({ error : e }); // Bad Request
  }

  UserDbService.update(userToUpdate, function(err, result){
    if(err) return res.sendStatus(500);
    return res.status(200).json(userDbToVm(result));
  });
});

router.post('/user/setpassword', function (req, res){
  var userToUpdate = req.user;
  var newPw = null;
  try {
    newPw = req.body.password;
  } catch (e) {
    return res.status(400).json({ error : e }); // Bad Request
  }
  userToUpdate.setPassword(newPw, function(err, userUpdated){
    if(err)
      return res.sendStatus(500);

    res.json(userDbToVm(userUpdated));
  });

});

function userDbToVm(user){
  return {
    _id : user._id,
    name : user.name,
    username: user.username
  };
}

module.exports = router;
