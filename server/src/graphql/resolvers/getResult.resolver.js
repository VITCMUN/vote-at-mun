const logger = require('../../winston');

exports.getResult = async (_, { id }, { currentUser, Vote, Poll }) => {
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  try {
    const poll = await Poll.findByPk(id);
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
    logger.info(`query: result::poll Id::${id}`);
    return {
      voteYes: yes,
      voteNo: no,
      twoThirdsMajority: poll.two_thirds_majority
    };
  } catch (error) {
    logger.error(`getResultError::${error}`);
    throw new Error('Some Error Occured');
  }
};
