(function (shawi, angular) {
    'use strict';

    var store = angular.module('app.store', []);
    var common = angular.module('app.common', []);
    var filters = angular.module('app.filters', []);
    var proxies = angular.module('app.proxies', []);
    var services = angular.module('app.services', []);
    var directives = angular.module('app.directives', []);
    var controllers = angular.module('app.controllers', []);

    var app = angular.module('app', [
        'toastr',
        'ui.router',
        'app.store',
        'app.common',
        'app.filters',
        'app.proxies',
        'app.services',
        'app.directives',
        'app.controllers'
    ]);

})(shawi, angular);
