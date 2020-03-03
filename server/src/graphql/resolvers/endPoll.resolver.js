const logger = require('../../winston');

exports.endPoll = async (_, { id }, { currentUser, Poll, Vote, pubsub }) => {
  if (!currentUser || currentUser.userType !== 1) {
    throw new Error('No Security Clearance');
  }
  try {
    const poll = await Poll.findByPk(id);
    poll.active = false;
    await poll.save();

    const vote = await Vote.findAll({
      where: {
        pollId: id
      },
      attributes: ['vote_val']
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

    pubsub.publish('pollEnd', {
      pollEnd: {
        twoThirdsMajority: poll.two_thirds_majority,
        voteYes: yes,
        voteNo: no
      }
    });
  } catch (err) {
    logger.error(`Error ending Poll::${err}`);
    throw new Error('Error ending Poll');
  }
  return 'Success';
};
