(function (shawi, angular) {
    'use strict';

    angular.module('app.controllers')
        .controller('HotspotCreateController', ['$scope', '$location', 'HotspotProxy',
            function ($scope, $location, hotspotProxy) {

                function share() {

                    var hotspot = {
                        name: $scope.name,
                        address: $scope.address,
                        latitude: $scope.latitude,
                        longitude: $scope.longitude,
                        price: $scope.price,
                        upload: $scope.upload,
                        download: $scope.download
                    };

                    hotspotProxy.create(hotspot)
                        .then(function() {
                            $scope.notify('Yes! Yes! Yes!');
                            $location.url('/list');
                        })
                        .catch(function() {
                            $scope.notify('Humm..somthing went wrong here');
                        });

                };

                function testSpeed() {
                    // mock speed test
                    $scope.upload = Math.random() * 10;
                    $scope.download = Math.random() * 10;
                }

                angular.extend($scope, {
                    share: share,
                    testSpeed: testSpeed
                });

            }
        ]);

}(shawi, angular));