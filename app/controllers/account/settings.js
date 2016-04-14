(function (shawi, angular) {
    'use strict';

    angular.module('app.controllers')
        .controller('AccountSettingsController', ['$scope', 'AccountService',
            function ($scope, accountService) {

                $scope.changePassword = function () {

                    var details = {
                        current: $scope.password.current,
                        newpass: $scope.password.newpass
                    };

                    accountService.changePassword(details)
                        .then(function () {
                            // reset form
                            $scope.password = {};
                            $scope.form.$setUntouched();
                            // notify user of success
                            $scope.notify("Password changed!");
                        })
                        .catch(function() {
                            $scope.notify('Oopss, something went wrong :(');
                        });
                }

                $scope.togglePassword = function () {

                    // we can do this using scope binding as well, but that's looking cleaner right now
                    if ($scope.password.show)
                        $('.change-password input[type=password]').prop('type', 'text');
                    else 
                        $('.change-password input[type=text]').prop('type', 'password');
                }

            }
        ]);

}(shawi, angular));