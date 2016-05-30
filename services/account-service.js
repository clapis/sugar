var validator = require('validator');

var User = require('../model/user');
var ValidationError = require('../errors/validation-error');

var LogService = require('./log-service');
var MailService = require('./mail-service');

module.exports = AccountService;

function AccountService() {

    var mail = new MailService();
    var log = new LogService('services.account');

    function login(username, password) {

        if (!username) throw new ValidationError('username is required');
        if (!password) throw new ValidationError('password is required');

        var query = {
            username: username,
            password: password
        };

        return User.findOne(query).exec();
    }

    function exists(username) {

        return User.findOne({ username: username })
            .exec()
            .then(function(user) {
                return !!user;
            });

    }

    function register(username, password) {

        validateUsername(username);
        validatePassword(password);

        var user = new User({
          username: username,
          password: password
        });

        return user.save()
            .then(function(user) {
                log.info('registered user ' + user.username);
            });

    }

    function changePassword(userId, newpass) {

        validatePassword(newpass);

        return User.findByIdAndUpdate(userId, { password: newpass })
            .exec()
            .then(function(user) {
                if (!user) throw new Error(`UserId ${userId} not found`);
                return user;
            });

    }

    function validateUsername(username) {
        if (!username)
            throw new ValidationError('username is required');

        if (!validator.isEmail(username))
            throw new ValidationError('username must be an email');
    }

    function validatePassword(password) {
        if (!password)
            throw new ValidationError('password is required');

        if (password.length < 3)
            throw new ValidationError('password must be at least 3 characters long');
    }

    return {
        login: login,
        exists: exists,
        register: register,
        changePassword: changePassword
    }

}
