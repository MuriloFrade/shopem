var User = require('../models/user');

function add (user, callback){
  var newUser = new User(user);
  newUser.save(function(err, doc){
    if(err)
      callback(err);

    callback(null, doc);
  });
}
function get (item, callback){
  callback(null, item);
}

function update (item, callback){
  callback(null, item);
}

function remove (item, callback){
  callback(null, item);
}
module.exports = (function(){
  return {
    add:    add,
    get:    get,
    update: update,
    remove: remove
  };
})();
