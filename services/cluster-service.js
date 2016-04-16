var config = require('../config');
var mongodb = require('mongodb');

var Point = require('../model/gis/point');
var ClusterManager = require('./gis/cluster-manager');

module.exports = ClusterService;

function ClusterService() {

  var client = mongodb.MongoClient;

  this.getClusters = function(level) {

    return client
      .connect(config.database)
      .then(function (db) {
        var restos = db.collection('hotspots');
        return restos.find({}).limit(1000).toArray();
        //db.close();
      })
      .then(function(docs) {
          return cluster(docs, level);
      });

  }

  function cluster(docs, level) {

    var manager = new ClusterManager(level);

    for (var i = 0; i < docs.length; i++) {
      manager.add(Point.FromGeoJSON(docs[i].location));
    }

    return manager.clusters;

  }


}
