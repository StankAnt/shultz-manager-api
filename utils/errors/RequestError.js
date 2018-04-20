const httpStatusCodes = require('http-status-codes');
const errorTypes = require('../common').errorTypes;

class RequestError extends Error {
  constructor(code) {
    this.httpStatus = 200;

    switch (code) {
      case errorTypes.DUBLICATE_COMMENT:
        this.httpStatus = httpStatusCodes.LOCKED;
        break;
      case errorTypes.REQUIRED_PARAMS:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
      case errorTypes.VALIDATION_ERROR:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
      case errorTypes.INVALID_AUTH:
        this.httpStatus = httpStatusCodes.UNAUTHORIZED;
        break;
      default:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
    }
  }
}

module.exports = RequestError;
