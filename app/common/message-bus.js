(function (angular) {
    'use strict';

    angular
        .module('app.common')
        .factory('MessageBus', MessageBus);

    MessageBus.$inject = ['$rootScope'];

    function MessageBus($rootScope) {

        var bus = {};

        bus.publish = function (event) {
            $rootScope.$emit(event);
        };

        bus.on = function (event, callback) {
            $rootScope.$on(event, callback);
        };

        return bus;

    }

}(angular));
