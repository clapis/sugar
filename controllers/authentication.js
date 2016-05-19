var passport = require('passport');
var jwt = require('jsonwebtoken');
var BearerStrategy = require('passport-http-bearer').Strategy;

var config = require('../config');
var User = require('../model/user');

var LogService = require('../services/log-service');

module.exports = new Authentication();

function Authentication() {

    var log = new LogService('controllers.authentication');

    (function configure() {
        log.debug('configure');
        passport.use(new BearerStrategy(authenticate));
    })();

    function authenticate(token, cb) {

        log.debug(`authenticate token ${token}`);

        jwt.verify(token, config.secret, function(error, userId) {
            if (error) {
                log.info(`verify token ${token} failed.`, error);
                return cb(error);
            }

            log.debug(`verify token ${token} succeeded. user id: ${userId}`);

            User.findById(userId).exec()
                .then(function(user) {
                    if (!user) {
                        log.error(`authenticate token ${token} failed. no user with id: ${userId}`);
                        return cb(null, false);
                    }

                    log.debug(`authenticate token ${token} succeeded`);
                    return cb(null, user, { scope: 'all' });
                })
                .catch(function(error) {
                    log.error(`authenticate token ${token} failed. ${error}`);
                    return cb(error);
                });

        });

    }

    function token(user) {
        return jwt.sign(user.id, config.secret, { expiresIn: 60 });
    }

    function require() {
        return passport.authenticate('bearer', { session: false });
    }

    return {
        token: token,
        require: require,
    }

}
