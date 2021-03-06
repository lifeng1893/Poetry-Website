var mongoose = require('../lib/mongoose');
var mongooseTemp = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatarUrl: {type: String, default: '/images/default_avatar.svg'}
}, {
  versionKey: false
});

var User = mongoose.model('user', UserSchema);

module.exports = User;
