var mongoose = require('mongoose');

module.exports = mongoose.model('Hotspot', new mongoose.Schema({
  name: String,
  price: Number,
  upload: Number,
  download: Number,
  location: {
      type: String,
      coordinates: [Number]
  }
}, { typeKey: '$type' }));
