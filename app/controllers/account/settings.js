(function (shawi, angular) {
    'use strict';

    angular
        .module('app.controllers')
        .controller('AccountSettingsController', AccountSettingsController);

    AccountSettingsController.$inject = ['$scope', 'AccountService', 'Toaster'];


    function AccountSettingsController($scope, accountService, toaster) {

        $scope.changePassword = function () {

            var details = {
                current: $scope.password.current,
                newpass: $scope.password.newpass
            };

            accountService.changePassword(details)
                .then(function (result) {
                    // reset form
                    $scope.password = {};
                    $scope.form.$setUntouched();
                    // notify user of success
                    toaster.success("Password changed!");
                })
                .catch($scope.onError);
        }

        $scope.togglePassword = function () {

            // we can do this using scope binding as well, but that's looking cleaner right now
            if ($scope.password.show)
                $('.change-password input[type=password]').prop('type', 'text');
            else
                $('.change-password input[type=text]').prop('type', 'password');
        }

    };

}(shawi, angular));
