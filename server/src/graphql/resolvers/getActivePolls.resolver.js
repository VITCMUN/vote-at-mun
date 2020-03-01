exports.getActivePolls = async (_, __, { currentUser, Poll, Vote }) => {
  const poll = await Poll.findAll({
    where: {
      active: true
    },
  });

  const votes = await Vote.findAll({
    where: {
      voterId: currentUser.username
    },
    attributes: ['pollId']
  });

  const canVote = (pollId) => {
    for (let i = 0; i < votes.length; i += 1) {
      if (votes[i].pollId === pollId) return false;
    }
    return true;
  };

  const polls = [];

  for (let i = 0; i < poll.length; i += 1) {
    const pollInfo = {};
    pollInfo.pollId = poll[i].id;
    pollInfo.title = poll[i].title;
    pollInfo.description = poll[i].description;
    pollInfo.totalSpeakerTime = poll[i].total_speaker_time;
    pollInfo.raisedBy = poll[i].raised_by;
    pollInfo.username = poll[i].username_filter;
    if (currentUser) {
      if (canVote(pollInfo.pollId)) {
        polls.push(pollInfo);
      }
    }
  }

  return polls;
};
