const logger = require('../../winston');

exports.addPoll = async (
  _,
  { pollDetails },
  { currentUser, Poll, pubsub }
) => {
  if (!currentUser || currentUser.userType !== 1) {
    throw new Error('No Security Clearance');
  }

  await Poll.create({
    title: pollDetails.title,
    voting_type: pollDetails.votingType,
    total_speaker_time: pollDetails.totalSpeakerTime,
    description: pollDetails.description,
    raised_by: pollDetails.raisedBy,
  }).catch((err) => {
    logger.error(`Error in creating poll::${err}`);
    return new Error('Something went wrong');
  });
  logger.info(`New Poll created::${pollDetails.title}`);
  pubsub.publish('pollDetails', {
    pollDetails: {
      title: pollDetails.title,
      description: pollDetails.description,
      totalSpeakerTime: pollDetails.totalSpeakerTime,
      votingType: pollDetails.votingType,
      raisedBy: pollDetails.raisedBy,
    }
  });
  return pollDetails.title;
};
