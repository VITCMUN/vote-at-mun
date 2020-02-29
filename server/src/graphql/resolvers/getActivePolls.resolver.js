const logger = require('../../winston');

exports.getActivePolls = async (_, __, { Poll }) => {
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
    polls.push(pollInfo);
  }

  return polls;
};
