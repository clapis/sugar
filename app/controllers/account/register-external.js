(function (shawi, angular) {
    'use strict';

    angular.module('app.controllers')
        .controller('AccountRegisterExternalController', ['$scope', '$location', 'AccountService',
            function ($scope, $location, accountService) {

                function register() {

                    var userDetails = { email: $scope.email };

                    accountService.registerExternal(userDetails)
                        .then(function () {
                                window.location = '/auth/external'; // TODO: maybe url for authorization should come back from server?
                        })
                        .catch(function(result) {
                            if (result.status === 401) $location.url('/login');
                            else $scope.notify(result.error);
                        });

                };

                angular.extend($scope, {
                    register: register
                });

            }
        ]);

}(shawi, angular));