(function (angular) {
    'use strict';

    var app = angular.module('app');
    
    // Configure Routes
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { controller: 'MapController', templateUrl: '/app/views/map.html' })
            .when('/list', { controller: 'HotspotListController', templateUrl: '/app/views/hotspot/list.html' })
            .when('/hotspot/:id', { controller: 'HotspotDetailsController', templateUrl: '/app/views/hotspot/details.html' })
            .when('/share', { controller: 'HotspotCreateController', templateUrl: '/app/views/hotspot/create.html', login: true })
            .when('/login', { controller: 'AccountLoginController', templateUrl: '/app/views/account/login.html' })
            .when('/register', { controller: 'AccountRegisterController', templateUrl: '/app/views/account/register.html' })
            .when('/register-external', { controller: 'AccountRegisterExternalController', templateUrl: '/app/views/account/register-external.html' })
            .when('/settings', { controller: 'AccountSettingsController', templateUrl: '/app/views/account/settings.html', login: true })
            .when('/messages', { controller: 'MessagesController', templateUrl: '/app/views/messages.html', login: true })
            .when('/about', { templateUrl: '/app/views/about.html' })
            .when('/access-token', { controller: 'AccountAccessTokenController', template: '' })
            .when('/not-found', { templateUrl: '/app/views/not-found.html' });
        // .otherwise({ redirectTo: '/not-found'});

        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    }]);

    // Include Auth credentials on API calls
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('auth-http-interceptor');
    }]);

    // Prevent users to access pages that require login
    app.run(['$rootScope', '$location', 'AccountService', function ($rootScope, $location, accountService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next && next.login) {
                var user = accountService.getUserInfo();
                if (!user.isAuthenticated()) $location.url('/login');
            }
        });
    }]);


}(angular));
