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

                    if (!result.data.success)
                        return toaster.error('Password change failed');

                    // reset form
                    $scope.password = {};
                    $scope.form.$setUntouched();
                    // notify user of success
                    toaster.success("Password changed!");
                })
                .catch(function() {
                    toaster.error('Oopss, something went wrong :(');
                });
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
