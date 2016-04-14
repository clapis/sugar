(function (shawi, angular) {
    'use strict';

    angular.module('app.proxies')
        .factory('AccountProxy', ['$http', 
            function ($http) {

                var proxy = {};

                proxy.login = function (credentials) {

                    var data = {
                        grant_type: "password",
                        username: credentials.username,
                        password: credentials.password
                    };

                    var request = {
                        method: 'POST',
                        url: '/auth/token',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)
                    };

                    return $http(request);
                };

                proxy.register = function (details) {

                    var data = {
                        username: details.username,
                        password: details.password
                    };

                    return $http.post('/api/Account/Register', data);
                };

                proxy.registerExternal = function (details) {

                    var data = {
                         email: details.email
                    };

                    return $http.post('/api/Account/RegisterExternal', data);
                }

                proxy.changePassword = function (details) {

                    var data = {
                        currentPassword: details.current,
                        newPassword: details.newpass
                    };

                    return $http.post('/api/Account/ChangePassword', data);
                };

                return proxy;

            }
        ]);

}(shawi, angular));