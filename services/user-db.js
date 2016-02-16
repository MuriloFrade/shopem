var User = require('../models/user');

function add (user, callback){
  //var newUser = new User(user);
  User.register(user, user.password,function(err, doc){
    if(err)
      return callback(err);

    return callback(null, doc);
  });
}

function getByUsername (username, callback){
  User.findOne({ username: username}, function(err, user){
    if(err) return callback(err, null);
    return callback(null, user);
  });
}

function update (item, callback){
  User.findOneAndUpdate({ _id: item._id }, item, { new: true }, function(err, user){
    if(err) return callback(err, null);
    return callback(null, user);
  });
}

function remove (id, callback){
  User.remove({_id: id}, function(err){
    if(err) return callback(err, item);
    if(callback)
      return callback(null, null);
  });
}
module.exports = (function(){
  return {
    add:              add,
    getByUsername:    getByUsername,
    update:           update,
    remove:           remove
  };
})();
