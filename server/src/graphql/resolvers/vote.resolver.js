const logger = require("../../winston");

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
      var yes = 0,
        no = 0;
      var country = [];
      for (let i = 0; i < vote.length; i += 1) {
        //  country.push(vote[i].voterId);
        vote[i].vote_val ? (yes += 1) : (no += 1);
      }

      pubsub.publish("voteUpdate", {
        voteUpdate: {
          countYes: yes,
          countNo: no
        }
      });
    })
    .catch(err => {
      logger.error(`Error storing vote::${err}`);
      throw new Error("Error storing vote");
    });

  return voteDetails.vote;
};
