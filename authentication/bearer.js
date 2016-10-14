var passport = require('passport');
var jwt = require('jsonwebtoken');
var BearerStrategy = require('passport-http-bearer').Strategy;

var config = require('../config');
var User = require('../model/user');

var LogService = require('../services/log-service');


module.exports = BearerAuthentication;
    

function BearerAuthentication() {
    
    var log = new LogService('authentication.bearer');

    
    function configure() {
        log.debug(`configure`);
        passport.use(new BearerStrategy(authenticate));
    }
    
    function authenticate(token, cb) {

        log.debug(`authenticate bearer token ${token}`);

        jwt.verify(token, config.secret, function(error, userId) {
            if (error) {
                log.info(`verify bearer token ${token} failed.`, error);
                return cb(error);
            }

            log.debug(`verify bearer token ${token} succeeded. user id: ${userId}`);

            User.findById(userId).exec()
                .then(function(user) {
                    if (!user) {
                        log.error(`authenticate bearer token ${token} failed. no user with id: ${userId}`);
                        return cb(null, false);
                    }

                    log.debug(`authenticate bearer token ${token} succeeded`);
                    return cb(null, user, { scope: 'all' });
                })
                .catch(function(error) {
                    log.error(`authenticate bearer token ${token} failed. ${error}`);
                    return cb(error);
                });

        });
        
    }
    
    function require() {
        return passport.authenticate('bearer', { session: false });
    }

    return { 
        configure: configure,
        require: require
    };
    
}