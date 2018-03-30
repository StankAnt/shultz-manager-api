const httpStatus = require('http-status-codes');

const { initUserService } = require('../services/user');

const initUser = async ctx => {
  try {
    const body = await initUserService(ctx.request.body);
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      ctx.body = 'This user name already exists.';
    } else {
      ctx.body = 'Request error.';
    }
    ctx.status = httpStatus.BAD_REQUEST;
  }
};

module.exports = { initUser };
