(function (shawi, angular) {
    'use strict';

    angular.module('app.controllers')
        .controller('HotspotDetailsController', ['$scope', '$routeParams', 'HotspotProxy',
            function ($scope, $routeParams, hotspotProxy) {

                function loadHotspot(id) {
                    hotspotProxy.getById(id)
                        .then(function (result) {
                            $scope.hotspot = result.data;
                        })
                        .catch(function () {
                            $scope.notify('Unable to retrieve Wifi details - ');
                        });
                }

                (function() {
                    loadHotspot($routeParams.id);
                })();

            }
        ]);

}(shawi, angular));

