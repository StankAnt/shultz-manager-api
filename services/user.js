const { saveUser } = require('../repositories/user');

const initUserService = async data => {
  try {
    const userData = {
      name: data.name,
      pushToken: data.pushToken
    };
    return await saveUser(userData);
  } catch (err) {
    throw err;
  }
};

const getTokensService = async () => {
  try {
    return;
  } catch (err) {
    throw err;
  }
};

module.exports = { initUserService };
