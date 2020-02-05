const logger = require('../../winston');

exports.setCouncil = async (_, { name, bannerUrl }, { currentUser, Council }) => {
  if (!currentUser || currentUser.userType !== 2) {
    throw new Error('Not authenticated');
  }

  await Council.create({
    name,
    banner_url: bannerUrl
  }).catch((err) => {
    logger.error(`Error setting Council::${err}`);
    throw new Error('Error setting Council');
  });
  return name;
};
