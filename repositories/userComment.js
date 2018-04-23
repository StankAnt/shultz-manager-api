const mongoose = require('mongoose');
const UserComment = require('../models/userComment');

const { DataBaseError, RequestError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const saveComment = async commentData => {
  const comment = new UserComment(commentData);
  try {
    await comment.save();
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getComments = async filter => {
  try {
    console.log(filter._userId);
    return await UserComment.aggregate([
      {
        $match: {
          _userId: mongoose.Types.ObjectId(filter._userId)
        }
      },
      {
        $lookup: {
          as: 'sender',
          foreignField: '_id',
          from: 'users',
          localField: '_senderId'
        }
      },
      { $unwind: '$sender' },
      {
        $group: {
          _id: '$_id',
          sender: { $first: { name: '$sender.name', _id: '$sender._id' } },
          rate: { $first: '$rate' },
          message: { $first: '$message' }
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
    if (err.name === 'CastError') {
      throw new RequestError(errorTypes.INVALID_DATA);
    }
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getOneComment = async filter => {
  try {
    return await UserComment.findOne(filter);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new RequestError(errorTypes.INVALID_DATA);
    }
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

module.exports = { saveComment, getOneComment, getComments };
