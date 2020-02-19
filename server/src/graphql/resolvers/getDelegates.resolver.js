const logger = require("../../winston");

exports.getDelegates = async (_, __, { currentUser, User }) => {
  // if (!currentUser) {
  //   throw new Error('Not authenticated');
  // }

  const users = await User.findAll({
    where: {
      user_type: 0
    },
    attributes: ["username"]
  });

  if (!users) {
    logger.error(`Error fetching users::${users}`);
    throw new Error("Error fetching users.");
  }

  const usernames = [];

  for (let i = 0; i < users.length; i += 1) {
    usernames.push(users[i].username);
  }

  return usernames;
};
