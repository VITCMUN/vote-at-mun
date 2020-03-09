const logger = require('../../winston');

exports.vote = async (_, { voteDetails }, { currentUser, Vote, Poll, pubsub }) => {
  if (!currentUser || currentUser.userType !== 0) {
    throw new Error('Not Allowed');
  }

  const pollStatus = await Poll.findAll({
    where: {
      id: voteDetails.pollId,
      active: true,
    }
  });

  if (pollStatus.length === 0) {
    throw new Error('Trying to vote on an inactive poll.');
  }
  try {
    await Vote.create({
      vote_val: voteDetails.vote,
      voterId: currentUser.username,
      pollId: voteDetails.pollId
    });

    const vote = await Vote.findAll({
      where: {
        pollId: voteDetails.pollId
      }
    });

    let yes = 0;
    let no = 0;
    const country = [];
    for (let i = 0; i < vote.length; i += 1) {
      const temp = { country: vote[i].voterId, value: vote[i].vote_val };
      country.push(temp);
      if (vote[i].vote_val) {
        yes += 1;
      } else {
        no += 1;
      }
    }

    pubsub.publish(`voteUpdate${voteDetails.pollId}`, {
      voteUpdate: {
        countYes: yes,
        countNo: no,
        username: country,
      }
    });
  } catch (err) {
    logger.error(`Error storing vote::${err}`);
    throw new Error('Error storing vote');
  }


  return voteDetails.vote;
};
