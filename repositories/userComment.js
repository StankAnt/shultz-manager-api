const mongoose = require('mongoose');
const UserComment = require('../models/userComment');

const saveComment = async commentData => {
  const comment = new UserComment(commentData);
  try {
    await comment.save();
  } catch (err) {
    throw err;
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
    throw err;
  }
};

module.exports = { saveComment };
