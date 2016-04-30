var phonetic = require('phonetic');

var db = require('../../db');
var cities = require('./cities');
var Hotspot = require('../../model/hotspot');

function HotspotGenerator () {

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


db.once('open', function() {

    var gen = new HotspotGenerator();

    var hotspots = Object.keys(cities)
                    .map(c => gen.generate(20, cities[c]))
                    .reduce((x,y) => x.concat(y), []);

    Hotspot.insertMany(hotspots, function(err, docs) {

        if (err)
            console.error('Error: ' + err);
        else
            console.info('%d hotspots were successfully stored.', docs.length);

        db.close();

    })

})
