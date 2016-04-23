(function(angular) {
    'use strict';

    angular
        .module('app.common')
        .service('Toaster', Toaster);

    Toaster.$inject = ['toastr', 'toastrConfig'];

    function Toaster(toastr, toastrConfig) {

        (function config () {
            //toastrConfig.positionClass = 'toast-top-center';
        })();

        this.error = function(msg) {
            toastr.error(msg);
        }

    }

})(angular);
