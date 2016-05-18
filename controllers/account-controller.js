var express = require('express');
var auth = require('./authentication');

var LogService = require('../services/log-service');
var AccountService = require('../services/account-service');

module.exports = AccountController;

function AccountController() {

    var router = express.Router();

    var log = new LogService('controllers.account');
    var accountService = new AccountService();

    router.post('/login', function(request, response, next) {

        accountService.login(request.body.username, request.body.password)
            .then(function(result) {
                response.json(result);
            })
            .catch(next);
    });

    router.get('/exists/:username', function(request, response, next) {

        accountService.exists(request.params.username)
            .then(function(result) {
                response.json(result);
            })
            .catch(next);
    });

    router.post('/register', function(request, response, next) {

        accountService.register(request.body.username, request.body.password)
            .then(function(result) {
                response.json(result);
            })
            .catch(next);

    });

    router.post('/change-password', auth.require(), function(request, response, next) {

        var model = request.body;

        log.debug(request.user);

        accountService.changePassword(model.username, model.oldpass, model.newpass)
            .then(function(result) {
                response.json(result);
            })
            .catch(next);

    });

    return router;
}
