var User = require('../model/user');

module.exports = UserService;

function UserService() {

    function findByToken(token) {
        return User.findOne({ token: token}).exec();
    }

    return {
        findByToken: findByToken
    };

}
