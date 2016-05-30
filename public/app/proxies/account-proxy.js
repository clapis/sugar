(function (shawi, angular) {
    'use strict';

    angular
        .module('app.proxies')
        .factory('AccountProxy', AccountProxy);

    AccountProxy.$inject = ['$http'];

    function AccountProxy($http) {

        var proxy = {};

        proxy.login = function (credentials) {

            var data = {
                username: credentials.username,
                password: credentials.password
            };

            return $http.post('/api/account/login', data);
        };

        proxy.exists = function(username) {
            return $http.get('/api/account/exists/' + username);
        };

        proxy.register = function (details) {

            var data = {
                username: details.username,
                password: details.password
            };

            return $http.post('/api/account/register', data);
        };

        proxy.registerExternal = function (details) {

            var data = {
                 email: details.email
            };

            return $http.post('/api/account/register-external', data);
        }

        proxy.changePassword = function (details) {

            var data = {
                oldpass: details.current,
                newpass: details.newpass
            };

            return $http.post('/api/account/change-password', data);
        };

        return proxy;
    }

}(shawi, angular));
