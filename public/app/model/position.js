(function (shawi) {
    'use strict';

    shawi.model.Position = function (lat, lng, accuracy) {

        var self = this;

        (function () {
            self.lat = lat || 0;
            self.lng = lng || 0;
            self.accuracy = accuracy || Infinity;
        }());

    };

}(shawi));