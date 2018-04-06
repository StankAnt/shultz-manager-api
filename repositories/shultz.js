const mongoose = require('mongoose');
const Shultz = require('../models/shultz');

const saveShultz = async shultzData => {
  try {
    const shultz = new Shultz(shultzData);
    await shultz.save();
  } catch (err) {
    throw err;
  }
};

const shultzList = async filter => {
  try {
    return await Shultz.aggregate([
      {
        $lookup: {
          as: 'user',
          foreignField: '_id',
          from: 'users',
          localField: '_userId'
        }
      },
      { $unwind: '$user' },
      {
        $group: {
          _id: '$_id',
          user: { $first: '$user.name' },
          date: { $first: '$date' },
          power: { $first: '$power' },
          location: { $first: '$location' }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: filter.limit || 10
      },
      {
        $skip: filter.offset || 0
      }
    ]);
  } catch (err) {
    throw err;
  }
};

module.exports = { saveShultz, shultzList };
