var sendgrid = require('sendgrid');
var config = require('../config');
var LogService = require('./log-service');

module.exports = MailService;

function MailService() {

    var log = new LogService();

    var proxy = sendgrid(config.sendgrid.username, config.sendgrid.password);

    function send(to, subject, text) {

        proxy.send({
          to:       to,
          from:     'noreply@wifisugar.herokuapp.com',
          subject:  subject,
          text:     text
        }, function(err, json) {
          if (err) log.error(err);
        });
    }

    return {
        send: send
    }

}
