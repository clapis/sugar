(function (shawi, angular) {
    'use strict';

    angular
        .module('app.common')
        .factory('auth-http-interceptor', AuthHttpInterceptor);

    AuthHttpInterceptor.$inject = ['UserStore'];

    function AuthHttpInterceptor(userStore) {
        return {
            'request': function (config) {

                var user = userStore.getUserInfo();

                if (user.isAuthenticated()) {
                    var auth = { "Authorization": "Bearer " + user.accessToken };
                    angular.extend(config.headers, auth);
                }

                return config;
            }
        };
    }

}(shawi, angular));
