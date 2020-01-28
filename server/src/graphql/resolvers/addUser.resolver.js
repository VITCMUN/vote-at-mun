const bcrypt = require('bcryptjs');
const logger = require('../../winston');
const { saltRounds } = require('../../config').config;

exports.addUser = async (
  _,
  { username, password, userType, displayPicUrl, stance },
  { currentUser, User }
) => {
  if (!currentUser || currentUser.userType !== 2) {
    throw new Error('Not authenticated');
  }

  const user = await User.findByPk(username);
  if (user) {
    logger.info(`User with username ${username} already exists`);
    throw new Error('User Already Exists');
  }
  const passHash = await bcrypt.hashSync(password, saltRounds);
  await User.create({
    username: username,
    password: passHash,
    user_type: userType,
    profile_pic_url: displayPicUrl,
    stance,
  });
  logger.info(`User with username ${username} created`);
  return `User created: ${username}`;
};
