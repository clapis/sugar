(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular.module('app.controllers')
        .controller('MainController', ['$scope', '$location', '$timeout', 'AccountService', 'MessageBus',
            function ($scope, $location, $timeout, accountService, messageBus) {

                var notificationTimer;

                function refreshUserInfo() {
                    $scope.user = accountService.getUserInfo();
                }

                function logout() {
                    accountService.logout()
                        .then(function() {
                            refreshUserInfo();
                            $location.url('/login');
                        });
                }

                // TODO: should this go throught the message bus or it's own service. rename to alert?!
                function notify(msg) {
                    $timeout.cancel(notificationTimer);

                    $scope.notification = msg;

                    notificationTimer = $timeout(function () { $scope.notification = null }, 2000);
                }

                (function () {

                    messageBus.on(EVENT.Login, refreshUserInfo);

                    refreshUserInfo();

                }());

                angular.extend($scope, {
                    notify: notify,
                    logout: logout
                });

            }
        ]);

}(shawi, angular));