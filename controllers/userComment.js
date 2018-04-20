const httpStatusCodes = require('http-status-codes');

const { commentUserService, commentListService } = require('../services/userComment');

const commentUser = async ctx => {
  try {
    await commentUserService({
      user: ctx.state.user,
      data: ctx.request.body
    });
    ctx.status = httpStatusCodes.CREATED;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const commentList = async ctx => {
  try {
    ctx.body = await commentListService(ctx.request.body.filter);
    ctx.status = httpStatusCodes.OK;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

module.exports = { commentUser, commentList };
