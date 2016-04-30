var Schema = require('mongoose').Schema;

var db = require('../db');

module.exports = db.model('Hotspot', new Schema({
  name: String,
  price: Number,
  upload: Number,
  download: Number,
  location: {
      type: String,
      coordinates: [Number]
  }
}, { typeKey: '$type' }));
