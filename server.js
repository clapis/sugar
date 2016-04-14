var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');

var config = require('./config');
var controllers = require('./controllers');

// web app
var app = express();

// logging
app.use(morgan('dev'));

// controllers
app.use('/api', controllers);

// static files
app.use('/public', express.static(__dirname + '/public'));
app.use('/app/views', express.static(__dirname + '/app/views'));

// index.html
app.get('/', function(request, response) {
  response.sendFile('index.html', { root: __dirname + '/public'});
});

// start server
app.listen(config.server.port);
