var LogService = require('../services/log-service');

module.exports = ErrorHandler;

function ErrorHandler() {

    var log = new LogService();

    function handler(err, req, res, next) {

        log.error(err);

        res.status(500).send('Oops, something went wrong');

    }

    return handler;
}
