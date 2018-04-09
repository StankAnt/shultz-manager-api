const mongoose = require('mongoose');

const { saveShultz, shultzList } = require('../repositories/shultz');
const { getTokens } = require('../repositories/user');

const fcm = require('../utils/fcm');

const takeShultzService = async payload => {
  try {
    const shultzData = {
      _userId: new mongoose.Types.ObjectId(payload.user._id),
      power: payload.data.power,
      location: payload.data.location
    };
    const shultz = await saveShultz(shultzData);
    const pushTokens = (await getTokens(shultzData._userId)).map(item => item.pushToken);

    const pushData = {
      _id: shultz._id,
      date: shultz.date,
      user: payload.user.name,
      power: payload.data.power,
      location: payload.data.location
    };

    await fcm.sendMessage(pushTokens, pushData);
  } catch (err) {
    throw err;
  }
};

const shultzListServisce = async data => {
  try {
    let filter = {};

    if (data.limit) {
      filter.limit = data.limit;
    }

    if (data.offset) {
      filter.offset = data.offset;
    }

    return await shultzList(filter);
  } catch (err) {
    throw err;
  }
};

module.exports = { takeShultzService, shultzListServisce };
