const logger = require('../../winston');

exports.getActivePolls = async (_, __, { currentUser ,Poll, Vote }) => {
  const poll = await Poll.findAll({
    where: {
      active: true
    },
  });

  logger.debug(poll)

  const polls = [];

  for (let i = 0; i < poll.length; i += 1) {
    const pollInfo = {};
    pollInfo['pollId'] = poll[i]['id'];
    pollInfo['title'] = poll[i]['title'];
    pollInfo['description'] = poll[i]['description'];
    pollInfo['totalSpeakerTime'] = poll[i]['total_speaker_time'];
    pollInfo['raisedBy'] = poll[i]['raised_by'];
    pollInfo['username'] = [];
    if(currentUser){
      const vote = await Vote.findAll({
        where:{
          pollId: pollInfo.pollId,
          voterId: currentUser.username
        }
      })
      if(vote.length==0)
        polls.push(pollInfo);
    }
    else
      polls.push(pollInfo)
  }

  return polls;
};
