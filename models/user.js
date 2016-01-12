var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({});

UserSchema.plugin(passportLocalMongoose);

var model = mongoose.model('User', UserSchema);

module.exports = model;
