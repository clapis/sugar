(function (shawi, angular) {
    'use strict';

    var User = shawi.model.User;

    angular
        .module('app.services')
        .service('AccountService', AccountService);

    AccountService.$inject = ['$q', 'AccountProxy', 'UserStore'];

    function AccountService($q, accountProxy, userStore) {

        var service = {};

        service.getUserInfo = function () {
            return userStore.getUserInfo();
        };

        service.login = function (username, password, remember) {

            var credentials = {
                username: username,
                password: password
            };

            return accountProxy.login(credentials)
                .then(function (response) {
                    // get token
                    var token = response.data.token;
                    // create user from token
                    var user = new User(username, token);
                    // persist user
                    userStore.setUserInfo(user, remember);
                    // return user
                    return user;
                });
        };

        service.exists = function(username) {

            return accountProxy.exists(username);

        };

        service.logout = function () {

            return $.when(userStore.clearUserInfo());

        };

        service.register = function (details) {

            return accountProxy.register(details)
                .then(function() {
                    // login user automatically
                    return service.login(details.username, details.password, false);
                });
        };

        service.registerExternal = function (details) {

            return accountProxy.registerExternal(details);

        };

        service.changePassword = function (details) {

            return accountProxy.changePassword(details);

        };

        return service;
    }

}(shawi, angular));
