(function (shawi, angular) {
    'use strict';

    angular.module('app.common')
        .factory('MessageBus', ['$rootScope',
            function ($rootScope) {

                var bus = {};

                bus.publish = function (event) {
                    $rootScope.$emit(event);
                };

                bus.on = function (event, callback) {
                    $rootScope.$on(event, callback);
                };

                return bus;

            }
        ]);

}(shawi, angular));