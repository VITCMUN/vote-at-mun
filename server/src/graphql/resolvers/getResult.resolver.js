const logger = require("../../winston");

exports.getResult = async (_, { id }, { currentUser, Vote }) => {
  if (!currentUser) {
    throw new Error('Not authenticated');
  }


  const vote = await Vote.findAll({
    where: {
      pollId: id
    }
  })
      var yes = 0,
        no = 0;
      for (let i = 0; i < vote.length; i += 1) {
        vote[i].vote_val ? (yes += 1) : (no += 1);
      }
      logger.info('query result');
      return{
          countYes: yes,
          countNo: no
      }

};
