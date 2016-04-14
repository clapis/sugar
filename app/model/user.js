(function (shawi) {
    'use strict';

    shawi.model.User = function (username, accesToken) {

        var self = this;

        // constructor
        (function () {
            self.username = username || '';
        }());

        // priviledged methods
        function isAuthenticated() {
            return !!this.accessToken;
        }

        return {
            username: username,
            accessToken: accesToken,
            isAuthenticated: isAuthenticated
        };
    }

    // static methods
    shawi.model.User.fromAuthTicket = function (ticket) {
        return new shawi.model.User(ticket.username, ticket.access_token);
    }

}(shawi));

