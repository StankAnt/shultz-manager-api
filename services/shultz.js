const mongoose = require('mongoose');

const { saveShultz, shultzList, shultzListByCenter } = require('../repositories/shultz');
const { getTokens } = require('../repositories/user');

const fcm = require('../utils/fcm');
const { shultzTypes } = require('../utils/common');

const takeShultzService = async payload => {
  try {
    const pushTokens = (await getTokens(payload.user._id)).map(item => item.pushToken);
    let shultz = {};

    if (!Array.isArray(payload.data)) {
      const shultzData = {
        _userId: new mongoose.Types.ObjectId(payload.user._id),
        power: payload.data.power,
        location: payload.data.location
      };

      shultz = await saveShultz(shultzData);
    } else {
      const shultzesData = payload.data.map(item => ({
        _userId: new mongoose.Types.ObjectId(payload.user._id),
        power: item.power,
        location: item.location
      }));

      shultz = (await saveShultz(shultzesData)).pop();
    }

    const pushData = {
      _id: shultz._id,
      date: shultz.date,
      power: shultz.power,
      location: shultz.location,
      user: payload.user.name
    };

    await fcm.sendMessage(pushTokens, pushData);
  } catch (err) {
    throw err;
  }
};

const shultzListService = async data => {
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

const shultzListByCenterService = async data => {
  try {
    const center = [data.center.longitude, data.center.latitude];
    const rawList = await shultzListByCenter(center, data.radius);
    return rawList.filter(item => {
      const date = new Date();
      return (
        (item.power === shultzTypes.WHISPER.power && date - item.date <= 1000 * 60 * 5) ||
        (item.power === shultzTypes.LIKE_A_GIRL.power && date - item.date <= 1000 * 60 * 10) ||
        (item.power === shultzTypes.DAFAULT.power && date - item.date <= 1000 * 60 * 15) ||
        (item.power === shultzTypes.SHULTZ.power && date - item.date <= 1000 * 60 * 20) ||
        (item.power === shultzTypes.SKURCHIK.power && date - item.date <= 1000 * 60 * 25) ||
        (item.power === shultzTypes.ALCO_SHULTZ.power && date - item.date <= 1000 * 60 * 30)
      );
    });
  } catch (err) {
    throw err;
  }
};

const shultzTypesService = async () => {
  try {
    return Object.keys(shultzTypes).map(key => shultzTypes[key]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  takeShultzService,
  shultzListService,
  shultzListByCenterService,
  shultzTypesService
};
