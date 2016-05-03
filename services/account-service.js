var jwt = require('jsonwebtoken');

var config = require('../config')
var User = require('../model/user');

var LogService = require('./log-service');
var MailService = require('./mail-service');

module.exports = AccountService;

function AccountService() {

    var log = new LogService();
    var mail = new MailService();

    function login(username, password) {

        var query = {
            username: username,
            password: password
        };

        return User.findOne(query).exec()
            .then(function(user, error) {

                if (error) return log.error(error);
                if (!user) return { success: false };

                var token = jwt.sign(user.id, config.secret, { expiresIn: 60 });
                return { success: true, user: user, token: token };

            });

    }

    function register(username, password) {

        var user = new User({
          username: username,
          password: password
        });

        return user.save()
            .then(function(user) {
                mail.send(user.username, 'Please confirm your account', 'Test');
            });

    }

    return {
        login: login,
        register: register
    }

}
