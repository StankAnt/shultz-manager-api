const httpStatusCodes = require('http-status-codes');
const errorTypes = require('../common').errorTypes;

class DataBaseError extends Error {
  constructor(code) {
    super();

    this.httpStatus = 200;

    switch (code) {
      case errorTypes.DUPLICATE_RECORD:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
      case errorTypes.INTERNAL_DB_ERROR:
        this.httpStatus = httpStatusCodes.INTERNAL_SERVER_ERROR;
        break;
      default:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
    }
  }
}

module.exports = DataBaseError;
