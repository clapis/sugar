var phonetic = require('phonetic');

var Hotspot = require('../../model/hotspot');

module.exports = HotspotGenerator;

function HotspotGenerator() {

  function location(boundary) {
    var lngDelta = boundary.east - boundary.west;
    var latDelta = boundary.north - boundary.south;

    var lng = boundary.west + (Math.random() * lngDelta);
    var lat = boundary.south + (Math.random() * latDelta);

    return {
      type: "Point",
      coordinates: [lng, lat]
    };
  }

  function name() {
      return (
          phonetic.generate() + '-' +
          phonetic.generate() + '-' +
          Math.floor((Math.random() * 100) + 1));
  }

  function hotspot(boundary) {

      return new Hotspot({
          name: name(),
          price: 15 + Math.random() * 20,
          upload: Math.random(),
          download: Math.random(),
          location: location(boundary)
      });

  }


  function generate(count, boundary) {

    var results = [];

    for(var i = 0; i < count; i++) {
        results.push(hotspot(boundary));
    }

    return results;

  }

  return {
      generate: generate
  };

}
