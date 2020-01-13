const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecretKey = require('../../config').config.jwt_secret_key;

exports.login = async (_, { username, password }, { dataSources }) => {
  const user = await dataSources.User.findByPk(username);
  if (!user) {
    throw new Error('Invalid Username');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign(
    {
      username: user.username,
      userType: user.user_type,
    },
    jwtSecretKey,
    {
      expiresIn: '1d',
    }
  );
  const userType = user.user_type;
  return {
    user: {
      username,
      userType,
    },
    token,
  };
};
