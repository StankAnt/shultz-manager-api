const FCM = require('fcm-push');

const fcm = new FCM(process.env.FCM_KEY);

const message = (to, collapseKey, message) => ({
  to: to,
  collapse_key: process.env.COLLAPSE_KEY,
  data: {
    message: message
  },
  notification: {
    title: 'Shultz!',
    body: message
  }
});

const sendMessage = async (to, collapseKey, message) => {
  try {
    await fcm.send(message(to, collapseKey, message));
  } catch (err) {
    throw err;
  }
};
