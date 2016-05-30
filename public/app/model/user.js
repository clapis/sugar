(function (shawi) {
    'use strict';

    shawi.model.User = function (username, token) {

        this.username = username;
        this.token = token;

    }

    shawi.model.User.prototype.isAuthenticated = function() {
        return !!this.token;
    }


}(shawi));
