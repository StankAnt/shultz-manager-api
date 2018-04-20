const httpStatusCodes = require('http-status-codes');

const {
  takeShultzService,
  shultzListService,
  shultzListByCenterService,
  shultzTypesService
} = require('../services/shultz');

const takeShultz = async ctx => {
  try {
    await takeShultzService({
      user: ctx.state.user,
      data: ctx.request.body
    });
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const shultzList = async ctx => {
  try {
    ctx.body = await shultzListService(ctx.request.body.filter);
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const shultzListByCenter = async ctx => {
  try {
    ctx.body = await shultzListByCenterService(ctx.request.body.filter);
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const shultzTypes = async ctx => {
  try {
    ctx.body = await shultzTypesService();
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

module.exports = {
  takeShultz,
  shultzList,
  shultzListByCenter,
  shultzTypes
};
