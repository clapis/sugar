﻿(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular.module('app.controllers')
        .controller('AccountRegisterController', ['$scope', '$location', 'AccountService', 'MessageBus',
            function ($scope, $location, accountService, messageBus) {

                $scope.register = function() {

                    $scope.errors = [];

                    var details = {
                        username: $scope.username,
                        password: $scope.password
                    };

                    accountService.register(details)
                        .then(function (user) {
                            messageBus.publish(EVENT.Login);
                            $location.url('/');
                        })
                        .catch(function () {
                            $scope.errors.push('Oops, registration failed');
                        });
                };

            }
        ]);

}(shawi, angular));
