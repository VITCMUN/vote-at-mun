const logger = require("../../winston");

exports.endPoll = async (_, { id }, { currentUser, Poll, pubsub }) => {
  if (!currentUser || currentUser.userType !== 1) {
    throw new Error("No Security Clearance");
  }
  try {
    const poll = await Poll.findByPk(id);
    poll.active = false;
    await poll.save();
    pubsub.publish("pollEnd", { pollEnd: id });
  } catch (err) {
    logger.error(`Error ending Poll::${err}`);
    throw new Error("Error ending Poll");
  }
  return "Success";
};
