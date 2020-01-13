const bcrypt = require('bcryptjs');
const logger = require('../../winston');
const { saltRounds } = require('../../config').config;

exports.addUser = async (
  _,
  { username, password, userType, displayPicUrl, stance },
  { dataSources, userInstance }
) => {
  if (!userInstance || userInstance.userType !== 2) {
    throw new Error('Not authenticated');
  }

  const user = await dataSources.User.findByPk(username);
  if (user) {
    logger.info(`User with username ${username} already exists`);
    throw new Error('User Already Exists');
  }
  const passHash = await bcrypt.hashSync(password, saltRounds);
  await dataSources.User.create({
    username: username,
    password: passHash,
    user_type: userType,
    profile_pic_url: displayPicUrl,
    stance: stance,
  });
  logger.info(`User with username ${username} created`);
  return `User created: ${username}`;
};
