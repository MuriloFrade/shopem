var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

var model = mongoose.model('User', userSchema);

module.exports = model;
