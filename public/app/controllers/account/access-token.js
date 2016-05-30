(function (shawi, angular) {
    'use strict';

    var User = shawi.model.User;
    var EVENT = shawi.model.EVENT;

    angular.module('app.controllers')
        .controller('AccountAccessTokenController', ['$location', 'UserStore', 'MessageBus', 'Utilities',
            function ($location, userStore, messageBus, utilities) {

                (function () {

                    var fragment = $location.hash();

                    var ticket = utilities.parseQueryString(fragment);

                    var user = User.fromAuthTicket(ticket);

                    userStore.setUserInfo(user);

                    messageBus.publish(EVENT.Login);

                    $location.url('/');

                }());

            }
        ]);

}(shawi, angular));