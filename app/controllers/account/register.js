(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular.module('app.controllers')
        .controller('AccountRegisterController', ['$scope', '$location', 'AccountService', 'MessageBus', 'Toaster',
            function ($scope, $location, accountService, messageBus, toaster) {

                $scope.register = function() {

                    var details = {
                        username: $scope.username,
                        password: $scope.password
                    };

                    accountService.register(details)
                        .then(function (user) {
                            messageBus.publish(EVENT.Login);
                            $location.url('/');
                        })
                        .catch(function (error) {
                            console.log(error);
                            toaster.error('Oops.. something went wrong');
                        });
                };

            }
        ]);

}(shawi, angular));
