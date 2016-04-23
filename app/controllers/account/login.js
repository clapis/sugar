(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular
        .module('app.controllers')
        .controller('AccountLoginController', AccountLoginController);

    AccountLoginController.$inject = ['$scope', '$state', 'AccountService', 'MessageBus', 'Toaster'];

    function AccountLoginController($scope, $state, accountService, bus, toaster) {

        $scope.remeber = true;

        $scope.login = function() {

            accountService.login($scope.username, $scope.password, $scope.remember)
                .then(function (result) {

                    if (!result.success)
                        return toaster.error('Login failed');

                    bus.publish(EVENT.Login);
                    $state.go('map');

                })
                .catch(function (error) {
                    console.log(error);
                    toaster.error('Oops.. something went wrong');
                });
        }

    }

}(shawi, angular));
