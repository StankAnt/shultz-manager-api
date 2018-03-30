const mongoose = require('mongoose');
const bcrypt = require('bcrypt-promise');

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true
    },
    password: {
      required: true,
      type: String
    },
    pushToken: {
      required: true,
      type: String
    }
  },
  { versionKey: false }
);

UserSchema.pre('save', async function(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt, null);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async (candidatePassword, next) => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    next(null, isMatch);
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model('User', UserSchema);
