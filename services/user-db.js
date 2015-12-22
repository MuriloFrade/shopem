var User = require('../models/user');

function add (user, callback){
  var newUser = new User(user);
  newUser.save(function(err, doc){
    if(err)
      callback(err);

    callback(null, doc);
  });
}
// function get (item, callback){
//   callback({}, null);
// }
function getByEmail (email, callback){
  User.findOne({ email: email}, function(err, user){
    if(err) callback(err, null);
    callback(null, user);
  });
}

function update (item, callback){
  User.findOneAndUpdate({ _id: item._id }, item, function(err, user){
    if(err) callback(err, null);
    callback(null, user);
  });
}

function remove (item, callback){
  User.remove({_id: item._id}, function(err){
    if(err) callback(err, item);
    callback(null, null);
  });
}
module.exports = (function(){
  return {
    add:          add,
    getByEmail:   getByEmail,
    update:       update,
    remove:       remove
  };
})();
