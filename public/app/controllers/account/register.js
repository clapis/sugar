(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular
        .module('app.controllers')
        .controller('AccountRegisterController', AccountRegisterController);

    AccountRegisterController.$inject = ['$scope', '$state', '$stateParams', 'AccountService', 'MessageBus'];

    function AccountRegisterController($scope, $state, $stateParams, accountService, bus) {

        $scope.next = $stateParams.next || 'map';

        $scope.register = function() {

            var details = {
                username: $scope.username,
                password: $scope.password
            };

            accountService.register(details)
                .then(function (user) {
                    bus.publish(EVENT.Login);
                    $state.go($scope.next);
                })
                .catch($scope.onError);
        };

    }

}(shawi, angular));
