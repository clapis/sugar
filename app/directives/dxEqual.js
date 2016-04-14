(function (shawi, angular) {
    'use strict';

    angular.module('app.directives')
        .directive('dxEqual', [
            function () {

                function link(scope, element, attributes, ngModel) {

                    ngModel.$validators.equal = function (modelValue, viewValue) {

                        if (ngModel.$isEmpty(modelValue)) return true;

                        return modelValue === scope.otherValue;
                    }

                    scope.$watch('otherValue', function () {
                        ngModel.$validate();
                    });

                }

                return {
                    require: "ngModel",
                    scope: { otherValue: "=dxEqual" },
                    link: link
                };

            }
        ]);

}(shawi, angular));