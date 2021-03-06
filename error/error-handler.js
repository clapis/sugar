var LogService = require('../services/log-service');

var ValidationError = require('./validation-error');


module.exports = ErrorHandler;

function ErrorHandler() {

    var log = new LogService('controllers.error-handler');

    function handler(err, req, res, next) {

        log.error(err);

        if (err instanceof ValidationError) {
            res.status(400).send(err.message);

        } else {
            res.status(500).send('Oops, something went wrong');
        }

    }

    return handler;
}
