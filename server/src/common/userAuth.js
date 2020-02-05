const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config').config;
const { User } = require('../models/index');

exports.getUser = async token => {
  try {
    if (token) {
      const currentUser = jwt.verify(token, jwtSecretKey);
      if (!currentUser) {
        return null;
      }
      const user = await User.findByPk(currentUser.username);
      if (!user) {
        return null;
      }
      return currentUser;
    }
    return null;
  } catch (err) {
    return null;
  }
};
