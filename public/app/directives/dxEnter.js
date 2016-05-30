(function (shawi, angular) {
    'use strict';

    angular.module('app.directives')
        .directive('dxEnter', [
            function () {
                return function (scope, element, attrs) {
                    element.bind('keypress', function (event) {
                        if (event.which === 13 && !event.shiftKey) {
                            scope.$eval(attrs.ngEnter, { 'event': event });
                            event.preventDefault();
                        }
                    });
                };
            }
        ]);

}(shawi, angular));