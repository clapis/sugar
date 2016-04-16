(function (angular) {
    'use strict';

    var app = angular.module('app');

    // Configure Routes
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider
                .state('map', { url: '/', controller: 'MapController', templateUrl: '/app/views/map.html' })
                .state('share', { url: '/share', controller: 'HotspotCreateController', templateUrl: '/app/views/hotspot/create.html', login: true })
                .state('hotspot', { url: '/hotspot/:id', controller: 'HotspotDetailsController', templateUrl: '/app/views/hotspot/details.html' })
                .state('hotspots', { url: '/hotspots', controller: 'HotspotListController', templateUrl: '/app/views/hotspot/list.html' })
                .state('login', { url: '/account/login', controller: 'AccountLoginController', templateUrl: '/app/views/account/login.html' })
                .state('register', { url: '/account/register', controller: 'AccountRegisterController', templateUrl: '/app/views/account/register.html' })
                .state('register-external', { url: '/account/register-external', controller: 'AccountRegisterExternalController', templateUrl: '/app/views/account/register-external.html' })
                .state('settings', { url: '/account/settings', controller: 'AccountSettingsController', templateUrl: '/app/views/account/settings.html', login: true })
                .state('messages', { url: '/messages', controller: 'MessagesController', templateUrl: '/app/views/messages.html', login: true })
                .state('about', { url: '/about', templateUrl: '/app/views/about.html' })
                .state('not-found', { url: '/not-found', templateUrl: '/app/views/not-found.html' })
                .state('access-token', { url: '/access-token', controller: 'AccountAccessTokenController', template: '' });

            $urlRouterProvider.otherwise('/not-found');

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }
    ]);

    // Include Auth credentials on API calls
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('auth-http-interceptor');
    }]);

    // Prevent users to access pages that require login
    app.run(['$rootScope', '$state', 'AccountService',
        function ($rootScope, $state, accountService) {
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options) {
                    if (toState.login) {
                        var user = accountService.getUserInfo();
                        if (!user.isAuthenticated()) {
                            event.preventDefault();
                            $state.go('login');
                        }
                    }
                });
    }]);


}(angular));
