const httpStatusCodes = require('http-status-codes');
const jwt = require('../utils/jwt');
const { initUserService, authUserService, getUserProfileService } = require('../services/user');

const initUser = async ctx => {
  try {
    await initUserService(ctx.request.body);
    ctx.status = httpStatusCodes.CREATED;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const authUser = async ctx => {
  try {
    const user = await authUserService(ctx.request.body);
    ctx.body = { token: jwt.encode({ name: user.name, _id: user._id }) };
    ctx.status = httpStatusCodes.OK;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.UNAUTHORIZED;
  }
};

const getUserProfile = async ctx => {
  try {
    ctx.body = await getUserProfileService(ctx.params.id);
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const verifyUser = async (ctx, next) => {
  try {
    ctx.state.user = jwt.decode(ctx.request.headers.auth);
    await next();
  } catch (err) {
    ctx.status = httpStatusCodes.UNAUTHORIZED;
  }
};

module.exports = { initUser, authUser, verifyUser, getUserProfile };
