var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

var model = mongoose.model('User', userSchema);

module.exports = model;
