(function (angular) {
    'use strict';

    var app = angular.module('app');

    // Include Auth credentials on API calls
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('auth-http-interceptor');
    }]);


}(angular));
