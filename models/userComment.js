const mongoose = require('mongoose');

const UserCommentSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    _senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    rate: {
      type: Number,
      required: true
    },
    message: {
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('UserComment', UserCommentSchema);
