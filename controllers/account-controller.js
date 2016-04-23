var express = require('express');
var jwt = require('jsonwebtoken');

var config = require('../config')
var User = require('../model/user');

var router = express.Router();

router.post('/login', function(request, response) {

    var query = {
        username: request.body.username,
        password: request.body.password
    };

    User.findOne(query).exec()
      .then(function(user, error) {
        if (error || user == null) {
          response.json({ success: false });
        } else {
          var token = jwt.sign(user.id, config.secret, { expiresInMinutes: 1 });
          response.json({ success: true, token: token });
        }
      })
      .catch(function(error) {
          throw error;
      });

});

router.post('/register', function(request, response) {

      var user = new User({
        username: request.body.username,
        password: request.body.password
      });

      user.save()
        .then(function(user) {
          response.json({ success: true });
        })
        .catch(function(err) {
          throw err;
        });

});

module.exports = router;
