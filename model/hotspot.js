var db = require('../db');

module.exports = db.model('Hotspot', {
  name: String,
  price: Number,
  upload: Number,
  download: Number,
  location: {
      type: String,
      coordinates: [Number]
  }
}, { typeKey: '$type' });
