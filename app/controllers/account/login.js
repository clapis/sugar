(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular.module('app.controllers')
        .controller('AccountLoginController', ['$scope', '$location', 'AccountService', 'MessageBus',
            function ($scope, $location, accountService, messageBus) {

                $scope.remeber = true;

                $scope.login = function() {

                    $scope.errors = [];

                    accountService.login($scope.username, $scope.password, $scope.remember)
                        .then(function (user) {
                            messageBus.publish(EVENT.Login);
                            $location.url('/');
                        })
                        .catch(function (result) {
                            if (result.data && result.data.error === 'invalid_grant')
                                $scope.errors.push(result.data.error_description);
                            else
                                $scope.errors.push('Humm.. login failed for some unknown reason');
                        });
                }

            }
        ]);

}(shawi, angular));
