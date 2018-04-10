const mongoose = require('mongoose');
const User = require('../models/user');

const saveUser = async userData => {
  const user = new User(userData);
  try {
    await user.save();
  } catch (err) {
    throw err;
  }
};

const findUser = async userData => {
  try {
    return User.findOne(userData);
  } catch (err) {
    throw err;
  }
};

const getTokens = async id => {
  try {
    return await User.find({ _id: { $ne: id } }, { pushToken: 1 });
  } catch (err) {
    throw err;
  }
};

const updatePushToken = async (id, pushToken) => {
  try {
    await User.findByIdAndUpdate(id, { $set: { pushToken } });
  } catch (err) {
    throw err;
  }
};

module.exports = { saveUser, findUser, getTokens, updatePushToken };
