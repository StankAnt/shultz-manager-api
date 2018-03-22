const mongoose = require('mongoose');

const ShultzSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    power: {
      type: Number,
      required: true
    },
    location: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Shultz', ShultzSchema);
