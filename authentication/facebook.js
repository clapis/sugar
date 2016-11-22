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
        passport.use(new FacebookStrategy(config.auth.facebook, authenticate));

        router.get('/facebook', passport.authenticate('facebook'));
        router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
    }

    function authenticate(accessToken, refreshToken, profile, done) {
        log.debug(`authenticate`);
        log.info(accessToken);
        log.info(profile);
        //if (error) return done(error);
        // done(null, user);
    }

    return { configure: configure };

}
