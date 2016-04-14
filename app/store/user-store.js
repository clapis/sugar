(function (shawi, angular) {
    'use strict';

    var User = shawi.model.User;

    angular.module('app.store')
        .service('UserStore', [
            function () {

                var store = {};

                store.getUserInfo = function () {
                    var str = sessionStorage["user"] || localStorage["user"];

                    var user = new User();
                    if (str) angular.extend(user, JSON.parse(str));
                    return user;
                };

                store.setUserInfo = function (user, persist) {
                    var str = JSON.stringify(user);
                    if (persist) {
                        localStorage["user"] = str;
                    } else {
                        sessionStorage["user"] = str;
                    }
                };

                store.clearUserInfo = function () {
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");
                };

                return store;

            }
        ]);

}(shawi, angular));