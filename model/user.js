var db = require('../db');

module.exports = db.model('User', {
  username: String,
  password: String
});
