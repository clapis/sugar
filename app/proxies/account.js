(function (shawi, angular) {
    'use strict';

    angular.module('app.proxies')
        .factory('AccountProxy', ['$http',
            function ($http) {

                var proxy = {};

                proxy.login = function (credentials) {

                    var data = {
                        username: credentials.username,
                        password: credentials.password
                    };

                    return $http.post('/api/account/login', data);
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
                        currentPassword: details.current,
                        newPassword: details.newpass
                    };

                    return $http.post('/api/account/change-password', data);
                };

                return proxy;

            }
        ]);

}(shawi, angular));
