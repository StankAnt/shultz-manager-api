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
    await saveShultz(shultzData);
    const pushTokens = (await getTokens()).map(item => item.pushToken);
    await fcm.sendMessage(pushTokens, `${payload.user.name} shultzed!`);
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
