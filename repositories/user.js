const mongoose = require('mongoose');
const User = require('../models/user');

const saveUser = async userData => {
  const user = new User(userData);
  try {
    return await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports = { saveUser };
