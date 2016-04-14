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
        var restos = db.collection('restaurants');
        return restos.find({}).limit(1000).toArray();
        //db.close();
      })
      .then(cluster);

  }

  function cluster(docs) {

    var manager = new ClusterManager(2);

    for (var i = 0; i < docs.length; i++) {
      manager.add(Point.FromGeoJSON(docs[i].location));
    }

    return manager.clusters;

  }


}
