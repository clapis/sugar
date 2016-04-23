var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser')

var config = require('./config');
var controllers = require('./controllers');

mongoose.connect(config.database);

// web app
var app = express();

// logging
app.use(morgan('dev'));

// for parsing application/json
app.use(bodyparser.json());

// controllers
app.use('/api', controllers);

// static files
app.use('/public', express.static(__dirname + '/public'));
app.use('/app/views', express.static(__dirname + '/app/views'));

// index.html
app.get('*', function(request, response) {
  response.sendFile('index.html', { root: __dirname + '/app/views'});
});

// start server
app.listen(config.server.port);
