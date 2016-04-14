module.exports = Boundary;

function Boundary(top, right, bottom, left) {
  this.top = top;
  this.bottom = bottom;
  this.left = left;
  this.right = right;
}

Boundary.prototype.contains = function(point) {
  return point.lat < this.top && point.lat > this.bottom
    && point.lng < this.right && point.lng > this.left;
}

Boundary.prototype.extend = function(point) {
  this.left = Math.min(this.left, point.lng);
  this.bottom = Math.min(this.bottom, point.lat);
  this.right = Math.max(this.right, point.lng);
  this.top = Math.max(this.top, point.lat);
}
