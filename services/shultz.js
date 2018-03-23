const mongoose = require('mongoose');

const { saveShultz, shultzList } = require('../repositories/shultz');

const takeShultzService = async data => {
  try {
    const shultzData = {
      _userId: new mongoose.Types.ObjectId(data.userId),
      power: data.power,
      location: data.location
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
