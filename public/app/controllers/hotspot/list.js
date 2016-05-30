(function (shawi, angular) {
    'use strict';

    angular.module('app.controllers')
        .controller('HotspotListController', ['$scope', '$location', 'HotspotProxy', 'Utilities', '$timeout',
            function ($scope, $location, hotspotProxy, utilities, $timeout) {

                $scope.hotspots = [];
                $scope.loading = false;

                (function () {

                    load();
                    onReachedBottom(load);

                }());

                function onReachedBottom(fn) {

                    $(window).scroll(utilities.debounce(function () {
                        if ($(window).scrollTop() == $(document).height() - $(window).height()) fn();
                    }, 250));

                }

                function load() {

                    if ($scope.loading) return;

                    $scope.loading = true;

                    var skip = $scope.hotspots.length;                    
                    
                    $timeout(function () {
                        hotspotProxy.get(skip)
                            .then(function (result) {
                                Array.prototype.push.apply($scope.hotspots, result.data);
                            })
                            .catch(function () {
                                $scope.notify('Unable to retrieve hotspots');
                            })
                            .finally(function () {
                                $scope.loading = false;
                            });

                    }, 500);
                }


            }
        ]);

}(shawi, angular));