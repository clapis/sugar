var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var LogService = require('../services/log-service');
var UserService = require('../services/user-service');

module.exports = new Authentication();

function Authentication() {

    var users = new UserService();
    var log = new LogService('controllers.authentication');

    (function configure() {
        log.debug('configure');
        passport.use(new BearerStrategy(authenticate));
    })();

    function authenticate(token, cb) {

        log.debug(`authenticate token ${token}`);

        users.findByToken(token)
            .then(function(user) {
                log.debug(`authenticate token ${token} succeeded. user: ${user}`);
                if (!user) return cb(null, false);
                return cb(null, user, { scope: 'all' });
            })
            .catch(function(error) {
                log.error(`authenticate token ${token} failed.`, error);
                cb(error);
            });

    }

    function require() {
        return passport.authenticate('bearer', { session: false });
    }


    return {
        require: require
    }

}
