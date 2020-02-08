const logger = require('../../winston');

exports.removeUser = async (
  _,
  { username },
  { currentUser, User }
) => {
  if (!currentUser || currentUser.userType !== 2) {
    throw new Error('Not authenticated');
  }

  const user = await User.findByPk(username);
  if (!user) {
    logger.info(`User with username ${username} does not exist`);
    throw new Error('User does not exist.');
  }

  const del = await user.destroy();
  if (!del) {
    logger.error('Error removing user');
    throw new Error('Error removing user.');
  }
  return 0;
};
