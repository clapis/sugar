module.exports = Point;

function Point (lng, lat) {
  this.lng = lng;
  this.lat = lat;
}

Point.FromGeoJSON = function(json) {
  if (json.type !== 'Point') throw 'Not a valid GeoJSON point';
  return new Point(json.coordinates[0], json.coordinates[1]);
}

Point.prototype.distance = function(point) {
  return Math.sqrt(Math.pow(point.lat - this.lat, 2) + Math.pow(point.lng - this.lng, 2));;
}
