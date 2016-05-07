var express = require('express');
var AccountService = require('../services/account-service');


var router = express.Router();


router.post('/login', function(request, response) {

    var service = new AccountService();

    service.login(request.body.username, request.body.password)
        .then(function(result) {
            response.json(result);
        })
        .catch(function(error) {
            throw error;
        })

});

router.post('/register', function(request, response) {

    var service = new AccountService();

    service.register(request.body.username, request.body.password)
        .then(function() {
            response.json({ success: true });
        })
        .catch(function(error) {
            throw error;
        });

});

router.post('/change-password', function(request, response) {

    var service = new AccountService();

    service.changePassword(request.body.username, request.body.oldpass, request.body.newpass)
        .then(function(result) {
            response.json(result);
        })
        .catch(function(error) {
            throw error;
        })

});

module.exports = router;
