(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('Toaster', Toaster);

    Toaster.$inject = ['toastr'];

    function Toaster(toastr) {

        var toaster = {};

        toaster.error = function(msg) {
            toastr.error(msg);
        }

        return toaster;
    }


})();
