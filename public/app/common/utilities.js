(function (angular) {
    'use strict';

    angular.module('app.common')
        .factory('Utilities', ['$timeout',
            function ($timeout) {

                var utilities = {};

                utilities.debounce = function (fn, delay) {
                    var timer = null;
                    return function () {
                        var context = this, args = arguments;
                        $timeout.cancel(timer);
                        timer = $timeout(function () {
                            fn.apply(context, args);
                        }, delay);
                    }
                };

                utilities.parseQueryString = function (queryString) {
                    var data = {},
                        pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

                    if (queryString === null) {
                        return data;
                    }

                    pairs = queryString.split("&");

                    for (var i = 0; i < pairs.length; i++) {
                        pair = pairs[i];
                        separatorIndex = pair.indexOf("=");

                        if (separatorIndex === -1) {
                            escapedKey = pair;
                            escapedValue = null;
                        } else {
                            escapedKey = pair.substr(0, separatorIndex);
                            escapedValue = pair.substr(separatorIndex + 1);
                        }

                        key = decodeURIComponent(escapedKey);
                        value = decodeURIComponent(escapedValue);

                        data[key] = value;
                    }

                    return data;
                }

                return utilities;

            }]
        );

}(angular));
