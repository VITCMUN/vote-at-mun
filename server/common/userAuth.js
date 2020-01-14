const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config').config;

exports.getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, jwtSecretKey);
    }
    return null;
  } catch (err) {
    return null;
  }
};
