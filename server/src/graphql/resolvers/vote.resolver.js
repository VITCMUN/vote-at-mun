const logger = require('../../winston');

exports.vote = async (_, { voteDetails }, { currentUser, Vote, pubsub }) => {
  if (!currentUser || currentUser.userType !== 0) {
    throw new Error("Not Allowed");
  }

  await Vote.create({
    vote_val: voteDetails.vote,
    voterId: currentUser.username,
    pollId: voteDetails.pollId
  });
  await Vote.findAll({
    where: {
      pollId: voteDetails.pollId
    }
  })
    .then(vote => {
      let yes = 0;
      let no = 0;
      const country = [];
      for (let i = 0; i < vote.length; i += 1) {
        var temp = { country: vote[i].voterId, value: vote[i].vote_val };
        country.push(temp);
        vote[i].vote_val ? (yes += 1) : (no += 1);
      }

      pubsub.publish(`voteUpdate${voteDetails.pollId}`, {
        voteUpdate: {
          countYes: yes,
          countNo: no,
          username: country,
        }
      });
    })
    .catch(err => {
      logger.error(`Error storing vote::${err}`);
      throw new Error('Error storing vote');
    });

  return voteDetails.vote;
};
