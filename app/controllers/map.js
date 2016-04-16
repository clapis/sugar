(function (shawi, angular, google) {
    'use strict';

    angular.module('app.controllers')
        .controller('MapController', ['$scope', '$location', 'ClusterProxy',
            function ($scope, $location, mapProxy) {

                var map;
                var icons = [];
                var autocomplete;

                (function () {

                    var options = {
                        zoom: 2,
                        minZoom: 2,
                        disableDefaultUI: true,
                        styles: shawi.map.style,
                        center: { lat: 28.7676591, lng: 10.1953125 },
                    };

                    map = new google.maps.Map(document.getElementById('map-canvas'), options);
                    //map.addListener('idle', reload);

                    autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), { types: ['geocode'] });
                    autocomplete.addListener('place_changed', onAddressChanged);

                    load();

                }());

                function onAddressChanged() {

                    var place = autocomplete.getPlace();

                    if (!place.geometry) {
                        alert('place has no geometry');
                        return;
                    }

                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }

                }


                function reload() {
                    clear();
                    load();
                };


                function clear() {
                    for (var i = 0; i < (icons ? icons.length : 0) ; i++) icons[i].setMap(null);
                    icons = [];
                }

                function load() {

                    var level = 0; // map.getZoom() + 2;

                    mapProxy.clusters(level)
                        .then(function (result) {

                            var clusters = result.data;

                            for (var i = 0; i < clusters.length; i++) {
                                add(clusters[i]);
                            }

                        })
                        .catch(function () {
                            alert('unable to load clusters at zoom level ' + level);
                        });
                }

                function add(cluster) {

                    var count = cluster.count;
                    var center = { lat: cluster.center.lat, lng: cluster.center.lng };

                    var sw = { lat: cluster.bounds.south, lng: cluster.bounds.west };
                    var ne = { lat: cluster.bounds.north, lng: cluster.bounds.east };

                    var bounds = new google.maps.LatLngBounds(sw, ne);

                    //var rec = new google.maps.Rectangle({
                    //    strokeColor: 'black',
                    //    strokeWeight: 1,
                    //    fillColor: 'transparent',
                    //    map: map,
                    //    bounds: bounds
                    //});

                    var marker = new google.maps.Marker({
                        position: center,
                        map: map,
                        icon: {
                            size: new google.maps.Size(64, 64),
                            anchor: new google.maps.Point(16, 16),
                            scaledSize: new google.maps.Size(32, 32),
                            url: '/public/images/cluster.png'
                        }
                    });

                    marker.addListener('click', function () {
                        map.fitBounds(bounds);
                    });

                    icons.push(marker);
                }



            }
        ]);

}(shawi, angular, google));
