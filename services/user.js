const { saveUser } = require('../repositories/user');
const validation = require('../utils/validation');

const initUserService = async data => {
  try {
    if (!validation.nameRegExp.test(data.name) || !validation.passwordRegExp.test(data.password)) {
      throw new Error('Validation Error');
    }
    const userData = {
      name: data.name,
      password: data.password,
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
