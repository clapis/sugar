var express = require('express');
var auth = require('../authentication');

var LogService = require('../services/log-service');
var AccountService = require('../services/account-service');

module.exports = AccountController;

function AccountController() {

    var router = express.Router();

    var account = new AccountService();
    var log = new LogService('controllers.account');

    router.post('/login', function(request, response, next) {

        var model = request.body;

        account.login(model.username, model.password)
            .then(function(user) {
                if (!user) return response.json({ success: false });

                var token = auth.token(user);
                response.json({ success: true, token: token });
            })
            .catch(next);
    });

    router.get('/exists/:username', function(request, response, next) {

        account.exists(request.params.username)
            .then(function(result) {
                response.json(result);
            })
            .catch(next);
    });

    router.post('/register', function(request, response, next) {

        account.register(request.body.username, request.body.password)
            .then(function() {
                response.sendStatus(200);
            })
            .catch(next);

    });

    router.post('/change-password', auth.require(), function(request, response, next) {

        var user = request.user;
        var model = request.body;

        account.login(user.username, model.oldpass)
            .then(function(user) {
                if (!user) return;
                return account.changePassword(user.id, model.newpass);
            })
            .then(function(user) {
                response.json({ success: !!user });
            })
            .catch(next);

    });

    return router;
}
