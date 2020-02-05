const bcrypt = require('bcryptjs');
const logger = require('../../winston');
const { saltRounds } = require('../../config').config;

exports.addUser = async (
  _,
  { userDetails },
  { currentUser, User }
) => {
  if (!currentUser || currentUser.userType !== 2) {
    throw new Error('Not authenticated');
  }

  const user = await User.findByPk(userDetails.username);
  if (user) {
    logger.info(`User with username ${userDetails.username} already exists`);
    throw new Error('User Already Exists');
  }
  const passHash = await bcrypt.hashSync(userDetails.password, saltRounds);
  await User.create({
    username: userDetails.username,
    password: passHash,
    user_type: userDetails.userType,
    profile_pic_url: userDetails.displayPicUrl,
    stance: userDetails.stance,
    observer: userDetails.observer,
  });
  logger.info(`User with username ${userDetails.username} created`);
  return `User created: ${userDetails.username}`;
};
