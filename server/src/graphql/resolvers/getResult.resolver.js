const logger = require('../../winston');

exports.getResult = async (_, { id }, { currentUser, Vote }) => {
  if (!currentUser) {
    throw new Error('Not authenticated');
  }


  const vote = await Vote.findAll({
    where: {
      pollId: id
    }
  });
  let yes = 0;
  let no = 0;
  for (let i = 0; i < vote.length; i += 1) {
    if (vote[i].vote_val) {
      yes += 1;
    } else {
      no += 1;
    }
  }
  logger.info('query result');
  return {
    countYes: yes,
    countNo: no
  };
};
