module.exports = ValidationError;

function ValidationError(msg) {
    this.name = 'ValidationError';
    this.message = msg;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constuctor = ValidationError;
