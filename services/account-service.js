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

        return User.findOne(query)
            .exec()
            .then(function(user) {
                if (!user) return { success: false };

                var token = jwt.sign(user.id, config.secret, { expiresIn: 60 });
                return { success: true, token: token };

            });

    }

    function register(username, password) {

        var user = new User({
          username: username,
          password: password
        });

        return user.save();

    }

    function changePassword(username, password, newpass) {

        var query = {
            username: username,
            password: password
        };

        return User.findOneAndUpdate(query, { password: newpass })
            .exec()
            .then(function(user) {
                return { success: !!user };
            });

    }

    return {
        login: login,
        register: register,
        changePassword: changePassword
    }

}
