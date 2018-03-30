const mongoose = require('mongoose');

const { saveShultz, shultzList } = require('../repositories/shultz');

const takeShultzService = async payload => {
  try {
    const shultzData = {
      _userId: new mongoose.Types.ObjectId(payload.user._id),
      power: payload.data.power,
      location: payload.data.location
    };
    await saveShultz(shultzData);
  } catch (err) {
    throw err;
  }
};

const shultzListServisce = async () => {
  try {
    return await shultzList();
  } catch (err) {
    throw err;
  }
};

module.exports = { takeShultzService, shultzListServisce };
