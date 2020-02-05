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
  }).then((poll) => {
    pubsub.publish('pollDetails', {
      pollDetails: {
        pollId: poll.id,
        title: poll.title,
        description: poll.description,
        totalSpeakerTime: poll.totalSpeakerTime,
        votingType: poll.votingType,
        raisedBy: poll.raisedBy,
      }
    });
    logger.info(`New Poll created::${pollDetails.title}`);
  }).catch((err) => {
    logger.error(`Error in creating poll::${err}`);
    return new Error('Something went wrong');
  });
  return pollDetails.title;
};
