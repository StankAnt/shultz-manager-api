const httpStatus = require('http-status-codes');
const jwt = require('../utils/jwt');
const { initUserService, authUserService } = require('../services/user');

const initUser = async ctx => {
  try {
    await initUserService(ctx.request.body);
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    if (err.code === 11000) {
      ctx.body = 'This user name already exists.';
    } else {
      ctx.body = 'Request error.';
    }
    ctx.status = httpStatus.BAD_REQUEST;
  }
};

const authUser = async ctx => {
  try {
    const user = await authUserService(ctx.request.body);
    ctx.body = { token: jwt.encode({ name: user.name, _id: user._id }) };
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatus.UNAUTHORIZED;
  }
};

const verifyUser = async (ctx, next) => {
  try {
    ctx.state.user = jwt.decode(ctx.request.headers.auth);
    await next();
  } catch (err) {
    ctx.status = httpStatus.UNAUTHORIZED;
  }
};

module.exports = { initUser, authUser, verifyUser };
