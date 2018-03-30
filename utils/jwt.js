const jwt = require('jsonwebtoken');
const util = require('util');

const encode = data => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { noTimestamp: true });
};

const decode = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    throw err;
  }
};

module.exports = { encode, decode };
