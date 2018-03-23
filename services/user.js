const { saveUser } = require('../repositories/user');

const initUserService = async data => {
  try {
    const userData = { name: data.name };
    return await saveUser(userData);
  } catch (err) {
    throw err;
  }
};

module.exports = { initUserService };
