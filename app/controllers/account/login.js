(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular
        .module('app.controllers')
        .controller('AccountLoginController', AccountLoginController);

    AccountLoginController.$inject = ['$scope', '$state', '$stateParams', 'AccountService', 'MessageBus'];

    function AccountLoginController($scope, $state, $stateParams, account, bus) {

        $scope.remeber = true;
        $scope.next = $stateParams.next || 'map';

        $scope.login = function() {

            account.login($scope.username, $scope.password, $scope.remember)
                .then(function (user) {
                    bus.publish(EVENT.Login);
                    $state.go($scope.next);
                })
                .catch($scope.onError);
        }

    }

}(shawi, angular));
