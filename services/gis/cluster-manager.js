var Cluster = require('../../model/gis/cluster');

module.exports = ClusterManager;


function ClusterManager(distance) {
  this.distance = distance;
  this.clusters = [];
}

ClusterManager.prototype.add = function(point) {

  var cluster = null;
  var min = this.distance;

  this.clusters.forEach(function(c) {
      var d = c.center.distance(point);
      if (d < min) {
        cluster = c;
        min = d;
      }
  });

  if (cluster) cluster.add(point);
  else this.clusters.push(new Cluster(point));

}
