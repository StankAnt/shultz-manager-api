const mongoose = require('mongoose');
const UserComment = require('../models/userComment');

const { DataBaseError } = require('../utils/errors');
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
    UserComment.aggregate([
      {
        $lookup: {
          as: 'senders',
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

module.exports = { saveComment };
