import CustomError from './customError';

function DataFetchError(message, cause) {
  CustomError.call(this, message);

  this.name = 'DataFetchError';
  this.cause = cause || null;
}

DataFetchError.prototype = Object.create(CustomError.prototype);
DataFetchError.prototype.constructor = DataFetchError;

module.exports = DataFetchError;
