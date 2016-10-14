var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');

var db = require('./db');
var config = require('./config');
var controllers = require('./controllers');
var authentication = require('./authentication');

// web app
var app = express();

// logging
app.use(morgan('dev'));

// for parsing application/json
app.use(bodyparser.json());

// authentication
app.use('/auth', authentication.router);

// controllers
app.use('/api', controllers.router);

// static files
app.use('/public', express.static(__dirname + '/public'));

// index.html
app.get('*', function(request, response) {
  response.sendFile('index.html', { root: __dirname + '/public'});
});

// start server
app.listen(config.server.port);
