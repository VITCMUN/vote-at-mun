const logger = require('../../winston');

exports.addPoll = async (_, { pollDetails }, { currentUser, Poll, pubsub }) => {
  logger.debug(currentUser);
  if (!currentUser || currentUser.userType !== 1) {
    throw new Error('No Security Clearance');
  }
  try {
    const poll = await Poll.create({
      title: pollDetails.title,
      total_speaker_time: pollDetails.totalSpeakerTime,
      description: pollDetails.description,
      raised_by: pollDetails.raisedBy,
      username_filter: pollDetails.username
    });
    pubsub.publish('pollDetails', {
      pollDetails: {
        pollId: poll.id,
        title: poll.title,
        description: poll.description,
        totalSpeakerTime: poll.total_speaker_time,
        raisedBy: poll.raised_by,
        username: poll.username_filter
      }
    });
    logger.info(`New Poll created::${pollDetails.title}`);
    return poll.id;
  } catch (err) {
    logger.error(`Error in creating poll::${err}`);
    return new Error('Something went wrong');
  }
};
