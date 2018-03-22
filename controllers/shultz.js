const httpStatus = require('http-status-codes');

const Shultz = require('../models/shultz');

const takeShultz = async ctx => {
  try {
    const shultz = new Shultz({
      _userId: new mongoose.Types.ObjectId(ctx.request.body.userId),
      power: ctx.request.body.power,
      location: ctx.request.body.location
    });
    await shultz.save();
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    ctx.body = 'Request error.';
    ctx.status = httpStatus.BAD_REQUEST;
  }
};

const shultzList = async ctx => {
  try {
    const shultzes = await Shultz.aggregate([
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
        $limit: 10
      }
    ]);

    ctx.body = shultzes;
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
};

module.exports = { takeShultz, shultzList };
