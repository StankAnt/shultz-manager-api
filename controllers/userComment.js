const httpStatus = require('http-status-codes');

const { commentUserService } = require('../services/userComment');

const commentUser = async ctx => {
  try {
    await commentUserService({
      user: ctx.state.user,
      data: ctx.request.body
    });
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
};

module.exports = { commentUser };
