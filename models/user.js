const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true
    },
    pushToken: {
      required: true,
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', UserSchema);
