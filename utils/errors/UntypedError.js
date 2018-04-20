const httpStatusCodes = require('http-status-codes');
const errorTypes = require('../common').errorTypes;

class UntypedError extends Error {
  constructor(code) {
    super();

    this.httpStatus = 200;

    switch (code) {
      case errorTypes.FCM_ERROR:
        this.httpStatus = httpStatusCodes.INTERNAL_SERVER_ERROR;
        break;
      default:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
    }
  }
}

module.exports = UntypedError;
