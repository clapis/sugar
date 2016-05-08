var express = require('express');
var AccountService = require('../services/account-service');

module.exports = AccountController;

function AccountController() {

    var router = express.Router();
    var accountService = new AccountService();

    router.post('/login', function(request, response) {


        accountService.login(request.body.username, request.body.password)
            .then(function(result) {
                response.json(result);
            })
            .catch(function(error) {
                throw error;
            })

    });

    router.post('/register', function(request, response) {

        accountService.register(request.body.username, request.body.password)
            .then(function() {
                response.json({ success: true });
            })
            .catch(function(error) {
                throw error;
            });

    });

    router.post('/change-password', function(request, response) {

        var model = request.body;

        accountService.changePassword(model.username, model.oldpass, model.newpass)
            .then(function(result) {
                response.json(result);
            })
            .catch(function(error) {
                throw error;
            })

    });

    return router;
}
