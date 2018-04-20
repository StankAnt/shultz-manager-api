const errorTypes = require('../common').errorTypes;
const RequestError = require('./RequestError');
const DataBaseError = require('./DataBaseError');
const UntypedError = require('./UntypedError');

module.exports = {
  RequestError,
  DataBaseError,
  UntypedError
};
