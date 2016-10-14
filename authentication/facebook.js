var passport = require('passport');
var jwt = require('jsonwebtoken');
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('../config');
var User = require('../model/user');

var LogService = require('../services/log-service');


module.exports = FacebookAuthentication;
    
function FacebookAuthentication() {
    
    var log = new LogService('authentication.facebook');


    function configure(router) {
        log.debug(`configuring facebook authentication`);
        passport.user(new FacebookStrategy(config.auth.facebook, authenticate));
        
        router.get('/facebook', authenticate);
        router.get('/facebook/callback', callback);
    }
    
    function require() {
        passport.authenticate('facebook');
    }

    function callback() {
        passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });
    }
    
    function authenticate(accessToken, refreshToken, profile, done) {
        //if (error) return done(error);
        log.debug(`authenticate`)
        //done(null, user);
    }
    
    return { configure: configure };

}