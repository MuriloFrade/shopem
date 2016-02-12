var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  name : { type: String, required: true }
});

var options = {};
options.errorMessages = {};
options.errorMessages.MissingPasswordError = 'No password was given.';
options.errorMessages.AttemptTooSoonError = 'Account is currently locked. Try again later.';
options.errorMessages.TooManyAttemptsError = 'Account locked due to too many failed login attempts.';
options.errorMessages.NoSaltValueStoredError = 'Authentication not possible. No salt value stored.';
options.errorMessages.IncorrectPasswordError = 'Password or Email are incorrect.';
options.errorMessages.IncorrectUsernameError = 'Password or Email are incorrect.';
options.errorMessages.MissingUsernameError = 'No Email was given.';
options.errorMessages.UserExistsError = 'A user with the given Email is already registered.';

UserSchema.plugin(passportLocalMongoose, options);

var model = mongoose.model('User', UserSchema);

module.exports = model;
