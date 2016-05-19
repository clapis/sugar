var User = require('../model/user');

var LogService = require('./log-service');
var MailService = require('./mail-service');

module.exports = AccountService;

function AccountService() {

    var mail = new MailService();
    var log = new LogService('services.account');

    function login(username, password) {

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

        var user = new User({
          username: username,
          password: password
        });

        return user.save()
            .then(function(user) {
                log.info('registered user ' + user.username);
                return { success: true };
            });

    }

    function changePassword(userId, newpass) {

        return User.findByIdAndUpdate(userId, { password: newpass })
            .exec()
            .then(function(user) {
                return { success: !!user };
            });

    }

    return {
        login: login,
        exists: exists,
        register: register,
        changePassword: changePassword
    }

}
