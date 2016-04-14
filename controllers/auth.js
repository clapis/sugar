var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config')
var User = require('../model/user');


var router = express.Router();

router.get('/authenticate/:name/:password', function(request, response) {

  var username = request.params.name;
  var password = request.params.password;

  User.findOne({ name: username }).exec()
    .then(function(user, err) {
      if (err)
        response.json({ success: false, msg: 'unexpected error' });
      else if (user == null)
        response.json({ success: false, msg: 'user not found' });
      else if (user.password !== password)
        response.json({ success: false, msg: 'invalid password' });
      else {
        var token = jwt.sign(user.id, config.secret, { expiresInMinutes: 1 });
        response.json({ success: true, token: token });
      }

    });
});

// ************** DEV HELPERS ****************

router.get('/users', function(request, response) {

  User.find({}).exec()
    .then(function(users) {
      response.json(users);
    });

});

router.get('/create/:name', function(request, response) {

  var nick = new User({
    name: request.params.name,
    password: 'p@ssw0rd'
  });

  nick.save()
    .then(function(user) {
      response.json({ success: true });
    })
    .catch(function(err) {
      throw err;
    });

});


// ************** END OF ****************

module.exports = router;
