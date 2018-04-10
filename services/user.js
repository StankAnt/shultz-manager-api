const { saveUser, findUser, updatePushToken } = require('../repositories/user');
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
    await saveUser(userData);
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

const authUserService = async userData => {
  try {
    const user = await findUser({ name: userData.name });
    const isMatch = await user.comparePassword(userData.password);
    if (isMatch) {
      if (userData.pushToken) {
        await updatePushToken(user._id, userData.pushToken);
      }

      return user;
    } else {
      throw new Error('Auth error.');
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { initUserService, authUserService };
