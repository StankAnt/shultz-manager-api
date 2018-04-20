const mongoose = require('mongoose');

const { saveComment, getOneComment, getComments } = require('../repositories/userComment');

const { RequestError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const commentUserService = async payload => {
  try {
    let commentData = {
      _senderId: new mongoose.Types.ObjectId(payload.user._id),
      _userId: new mongoose.Types.ObjectId(payload.data._userId),
      rate: payload.data.rate
    };

    if (commentData._senderId === commentData._userId) {
      throw new RequestError(errorTypes.INVALID_DATA);
    }

    const comment = await getOneComment({
      _userId: commentData._userId,
      _senderId: commentData._senderId
    });

    if (comment) {
      throw new RequestError(errorTypes.DUBLICATE_COMMENT);
    }

    if (payload.user.message) {
      commentData.message = payload.data.message;
    }

    return await saveComment(commentData);
  } catch (err) {
    throw err;
  }
};

const commentListService = async filter => {
  try {
    return await getComments(filter);
  } catch (err) {
    throw err;
  }
};

module.exports = { commentUserService, commentListService };
