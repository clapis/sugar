var mongoose = require('mongoose');
var config = require('../config');

var connection = mongoose.connection;

// When connecting
connection.on('connecting', function () {
  console.log('Mongoose connecting');
});

// When successfully connected
connection.on('connected', function () {
  console.log('Mongoose connected');
});

// When connection open
connection.on('open', function() {
  console.log('Mongoose connection open');
});

// When disconnecting
connection.on('disconnecting', function () {
  console.log('Mongoose disconnecting');
});

// When the connection is disconnected
connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

connection.on('close', function() {
    console.log('Mongoose connection closed');
});

connection.on('reconnected', function() {
    console.log('Mongoose reconnected');
});

// If the connection throws an error
connection.on('error', console.error.bind(console, 'Mongoose connection error: '));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

//mongoose.set('debug', true);

mongoose.connect(config.database);

exports.module = connection;
 
