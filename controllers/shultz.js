const httpStatus = require('http-status-codes');
const mongoose = require('mongoose');

const { takeShultzService, shultzListServisce } = require('../services/shultz');

const takeShultz = async ctx => {
  try {
    await takeShultzService({ user: ctx.state.user, data: ctx.request.body });
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    ctx.body = 'Request error.';
    ctx.status = httpStatus.BAD_REQUEST;
  }
};

const shultzList = async ctx => {
  try {
    ctx.body = await shultzListServisce();
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
};

module.exports = { takeShultz, shultzList };
