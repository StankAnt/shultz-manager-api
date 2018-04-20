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
    return await UserComment.aggregate([
      {
        $lookup: {
          as: 'sender',
          foreignField: '_id',
          from: 'users',
          localField: '_senderId'
        }
      }
    ]);
  } catch (err) {
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

module.exports = { saveComment, getOneComment };
