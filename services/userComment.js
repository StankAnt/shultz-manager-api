const mongoose = require('mongoose');

const { saveComment } = require('../repositories/userComment');

const commentUserService = async payload => {
  let commentData = {
    _senderId: payload.user._id,
    _userId: payload.data._userId,
    rate: payload.data.rate
  };

  if (payload.user.message) {
    commentData.message = payload.data.message;
  }

  return await saveComment(commentData);
};

module.exports = { commentUserService };
