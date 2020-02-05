const { addUser } = require('./addUser.resolver');
const { login } = require('./login.resolver');
const { addPoll } = require('./addPoll.resolver');
const { setCouncil } = require('./setCouncil.resolver');
const { vote } = require('./vote.resolver');
const logger = require('../../winston');

const num = 0;

module.exports = {
  Query: {
    nvotes: () => num,
  },
  Mutation: {
    vote,
    addUser, // admin
    setCouncil, // admin
    login,
    addPoll, // EB
  },
  Subscription: {
    voteUpdate: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('voteUpdate'),
    },
    pollDetails: { // delegate
      subscribe: (_, __, { currentUser, pubsub }) => {
        logger.info(`${currentUser.username} subscribed to pollDetails`);
        return pubsub.asyncIterator('pollDetails');
      },
    },
  },
};
