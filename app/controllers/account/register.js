(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular
        .module('app.controllers')
        .controller('AccountRegisterController', AccountRegisterController);

    AccountRegisterController.$inject = ['$scope', '$state', 'AccountService', 'MessageBus', 'Toaster'];

    function AccountRegisterController($scope, $state, accountService, bus, toaster) {

        $scope.register = function() {

            var details = {
                username: $scope.username,
                password: $scope.password
            };

            accountService.register(details)
                .then(function (result) {

                    if (!result.success)
                        return toaster.error('Registration failed');

                    bus.publish(EVENT.Login);
                    $state.go('map');
                })
                .catch(function (error) {
                    console.log(error);
                    toaster.error('Oops.. something went wrong');
                });
        };

    }


}(shawi, angular));
