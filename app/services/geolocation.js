(function (shawi, angular) {
    'use strict';

    var Position = shawi.model.Position;
    var EVENT = shawi.model.EVENT;

    angular.module('app.services')
        .service('GeolocationService', [ 'MessageBus', 
            function(messageBus) {

                var position = new Position();

                function getPositionFromBrowser() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (p) {
                            position = new Position(p.coords.latitude, p.coords.longitude, p.coords.accuracy);
                            messageBus.publish(EVENT.PositionUpdate);
                        });
                    }
                }

                function getCurrentPosition() {
                    if (position.accuracy === Infinity)
                        getPositionFromBrowser();

                    return position;
                }

                return {
                    getCurrentPosition: getCurrentPosition
                };

            }
        ]);

}(shawi, angular));