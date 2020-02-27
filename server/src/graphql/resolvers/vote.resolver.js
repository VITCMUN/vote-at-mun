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
        var temp = { country: vote[i].voterId, value: vote[i].vote_val };
        //  temp.push(vote[i].voterId);
        //temp.push(vote[i].vote_val);
        country.push(temp);
        vote[i].vote_val ? (yes += 1) : (no += 1);
      }
      // console.log(country);
      logger.error(`Error storing vote::${country}`);
      pubsub.publish("voteUpdate", {
        voteUpdate: {
          countYes: yes,
          countNo: no,
          username: country
        }
      });
    })
    .catch(err => {
      logger.error(`Error storing vote::${err}`);
      throw new Error("Error storing vote");
    });

  return voteDetails.vote;
};
