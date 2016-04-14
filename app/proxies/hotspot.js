(function (shawi, angular) {
    'use strict';

    angular.module('app.proxies')
        .factory('HotspotProxy', ['$http', // TODO: use $resource insteadof $http
            function ($http) {

                var proxy = {};

                proxy.get = function (skip, take) {
                    return $http.get('/api/Hotspot?skip=' + skip + '&take=' + take);
                };

                proxy.getById = function (id) {
                    return $http.get('/api/Hotspot/' + id);
                };

                proxy.create = function (hotspot) {

                    var data = {
                        id: hotspot.id,
                        name: hotspot.name,
                        price: hotspot.price,
                        address: hotspot.address,
                        upload: hotspot.upload,
                        download: hotspot.download,
                        latitude: hotspot.latitude,
                        longitude: hotspot.longitude
                    };

                    return $http.post('/api/Hotspot', data);
                };

                return proxy;

            }
        ]);

}(shawi, angular));