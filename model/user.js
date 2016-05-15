var db = require('../db');

module.exports = db.model('User', {
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 3 }
});
