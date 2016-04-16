module.exports = Boundary;

function Boundary(north, east, south, west) {
  this.north = north;
  this.south = south;
  this.west = west;
  this.east = east;
}

Boundary.prototype.contains = function(point) {
  return point.lat < this.north && point.lat > this.south
    && point.lng < this.east && point.lng > this.west;
}

Boundary.prototype.extend = function(point) {
  this.west = Math.min(this.west, point.lng);
  this.south = Math.min(this.south, point.lat);
  this.east = Math.max(this.east, point.lng);
  this.north = Math.max(this.north, point.lat);
}
