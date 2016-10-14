var express = require('express');
var jwt = require('jsonwebtoken');

var config = require('../config');
var User = require('../model/user');

var LogService = require('../services/log-service');

var BearerAuthentication = require('./bearer');
var FacebookAuthentication = require('./facebook');

module.exports = new Authentication();

function Authentication() {
    
    var router = express.Router();

    var log = new LogService('authentication');
    
    var bearer = new BearerAuthentication();
    var facebook = new FacebookAuthentication();

    (function configure() {
        bearer.configure();
        //facebook.configure();
    })();


    function token(user) {
        return jwt.sign(user.id, config.secret, { expiresIn: 60 });
    }

    function require() {
        return bearer.require();
    }

    return {
        token: token,
        require: require,
        router: router
    }

}
