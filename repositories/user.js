const mongoose = require('mongoose');
const User = require('../models/user');

const { DataBaseError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const saveUser = async userData => {
  const user = new User(userData);
  try {
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new DataBaseError(errorTypes.DUPLICATE_RECORD);
    } else {
      throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
    }
  }
};

const findUser = async userData => {
  try {
    return User.findOne(userData);
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getTokens = async id => {
  try {
    return await User.find({ _id: { $ne: id } }, { pushToken: 1 });
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const updatePushToken = async (id, pushToken) => {
  try {
    await User.findByIdAndUpdate(id, { $set: { pushToken } });
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

module.exports = { saveUser, findUser, getTokens, updatePushToken };
