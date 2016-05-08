var db = require('../../db');
var cities = require('./cities');

var HotspotGenerator = require('./hotspot');

module.exports = DbSeeder;

function DbSeeder() {

    this.seed = function() {

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

            });

        });
    }

}
