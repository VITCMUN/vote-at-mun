const logger = require("../../winston");

exports.getPollDetails = async (_, { id }, { currentUser, Poll }) => {
  if (!currentUser) {
    throw new Error('Not authenticated');
  }

  const poll = await Poll.findByPk(id);

  if (!poll) {
    logger.error(`Error fetching poll`);
    throw new Error("Error fetching poll.");
  }
  logger.debug(poll.id);
  return {
        pollId: poll.id,
        title: poll.title,
        description: poll.description,
        totalSpeakerTime: poll.total_speaker_time,
        raisedBy: poll.raised_by,
  };
};
