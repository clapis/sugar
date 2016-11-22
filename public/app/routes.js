(function (angular) {
    'use strict';

    var app = angular.module('app');

    // Configure Routes
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider
                .state('map', {
                    url: '/',
                    controller: 'MapController',
                    templateUrl: '/public/views/map.html'
                })
                .state('share', {
                    url: '/share',
                    controller: 'HotspotCreateController',
                    templateUrl: '/public/views/hotspot/create.html',
                    login: true
                })
                .state('hotspot', {
                    url: '/hotspot/:id',
                    controller: 'HotspotDetailsController',
                    templateUrl: '/public/views/hotspot/details.html'
                })
                .state('hotspots', {
                    url: '/hotspots',
                    controller: 'HotspotListController',
                    templateUrl: '/public/views/hotspot/list.html'
                })
                .state('login', {
                    url: '/account/login?next',
                    controller: 'AccountLoginController',
                    templateUrl: '/public/views/account/login.html'
                })
                .state('register', {
                    url: '/account/register?next',
                    controller: 'AccountRegisterController',
                    templateUrl: '/public/views/account/register.html'
                })
                .state('register-external', {
                    url: '/account/register-external',
                    controller: 'AccountRegisterExternalController',
                    templateUrl: '/public/views/account/register-external.html'
                })
                .state('settings', {
                    url: '/account/settings',
                    controller: 'AccountSettingsController',
                    templateUrl: '/public/views/account/settings.html',
                    login: true
                })
                .state('messages', {
                    url: '/messages',
                    controller: 'MessagesController',
                    templateUrl: '/public/views/messages.html',
                    login: true
                })
                .state('about', {
                    url: '/about',
                    templateUrl: '/public/views/about.html'
                })
                .state('not-found', {
                    url: '/not-found',
                    templateUrl: '/public/views/not-found.html'
                })
                .state('access-token', {
                    url: '/access-token',
                    controller: 'AccountAccessTokenController',
                    template: ''
                });

            // $urlRouterProvider.otherwise('/not-found');

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }
    ]);

    // Prevent users to access pages that require login
    app.run(['$rootScope', '$state', 'AccountService',
        function ($rootScope, $state, accountService) {
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options) {
                    if (toState.login) {
                        var user = accountService.getUserInfo();
                        if (!user.isAuthenticated()) {
                            event.preventDefault();
                            $state.go('login', { next: toState.name });
                        }
                    }
                });
    }]);


})(angular);
