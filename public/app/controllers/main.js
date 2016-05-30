(function (shawi, angular) {
    'use strict';

    var EVENT = shawi.model.EVENT;

    angular
        .module('app.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state', 'AccountService', 'MessageBus', 'Toaster'];

    function MainController ($scope, $state, account, bus, toaster) {

        (function () {
            bus.on(EVENT.Login, refreshUserInfo);
            refreshUserInfo();
        }());

        function refreshUserInfo() {
            $scope.user = account.getUserInfo();
        }

        function logout() {
            account.logout()
                .then(function() {
                    refreshUserInfo();
                    $state.go('login');
                });
        }

        function handleError(error) {
            console.log(error);
            toaster.error('Oops.. something went wrong');
        }

        angular.extend($scope, {
            logout: logout,
            onError: handleError
        });

    }

}(shawi, angular));
