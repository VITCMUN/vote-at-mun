const logger = require('../../winston');

exports.vote = async (_, { voteDetails }, { currentUser, Vote }) => {
  if (!currentUser || currentUser.userType !== 0) {
    throw new Error('Not Allowed');
  }

  await Vote.create({
    vote_val: voteDetails.vote,
    voterId: currentUser.username,
    pollId: voteDetails.pollId
  }).then((vote) => {
    logger.info(`${currentUser.username} voted ${vote.vote_val} for ${vote.pollId}`);
  }).catch((err) => {
    logger.error(`Error storing vote::${err}`);
    throw new Error('Error storing vote');
  });

  return voteDetails.vote;
};
