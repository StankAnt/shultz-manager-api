const FCM = require('fcm-push');

const fcm = new FCM(process.env.FCM_KEY);

const { UntypedError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const createMessage = (to, message) => ({
  registration_ids: to,
  collapse_key: process.env.COLLAPSE_KEY,
  data: message || 'Shultz!'
});

const sendMessage = async (to, message) => {
  try {
    await fcm.send(createMessage(to, message));
  } catch (err) {
    console.log(`FCM: ${err}`);
    throw new UntypedError(errorTypes.FCM_ERROR);
  }
};

module.exports = { sendMessage };
