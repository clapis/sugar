(function (shawi, angular) {
    'use strict';

    angular.module('app.proxies')
        .factory('ClusterProxy', ['$http',
            function ($http) {

                var proxy = {};

                proxy.clusters = function (level) {
                    return $http.get('/api/cluster/level/' + level);
                };

                return proxy;
            }
        ]);

})(shawi, angular);
