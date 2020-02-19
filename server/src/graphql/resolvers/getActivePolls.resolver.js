const logger = require("../../winston");

exports.getActivePolls = async (_, __, { Poll }) => {
  const poll = await Poll.findAll({
    where: {
      active: true
    },
    attributes: ["id"]
  });

  const polls = [];

  for (let i = 0; i < users.length; i += 1) {
    polls.push(poll[i].id);
  }

  return polls;
};
