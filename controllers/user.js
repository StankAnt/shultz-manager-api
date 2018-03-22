const User = require('../models/user');

const initUser = async ctx => {
  try {
    const user = new User({ name: ctx.request.body.name });
    ctx.body = await user.save();
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    if (err.code === 11000) {
      ctx.body = 'This user name already exists.';
    }
    ctx.body = 'Request error.';
    ctx.status = httpStatus.BAD_REQUEST;
  }
};

module.exports = { initUser };
