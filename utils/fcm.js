const FCM = require('fcm-push');

const fcm = new FCM(process.env.FCM_KEY);

const message = (to, message) => ({
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

const sendMessage = async (to, message) => {
  try {
    await fcm.send(message(to, message));
  } catch (err) {
    throw err;
  }
};
