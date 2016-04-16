var Point = require('./point');
var Boundary = require('./boundary');

module.exports = Cluster;

function Cluster (point) {
  this.count = 1;
  this.center = new Point(point.lng, point.lat);
  this.bounds = new Boundary(point.lat, point.lng, point.lat, point.lng);
}

Cluster.prototype.add = function(point) {
  this.center.lat = ((this.center.lat * this.count) + point.lat) / (this.count + 1);
  this.center.lng = ((this.center.lng * this.count) + point.lng) / (this.count + 1);
  this.bounds.extend(point);
  this.count++;
}
