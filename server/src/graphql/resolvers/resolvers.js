const { addUser } = require('./addUser.resolver');
const { login } = require('./login.resolver');
const { addPoll } = require('./addPoll.resolver');
const logger = require('../../winston');

let num = 0;

module.exports = {
  Query: {
    nvotes: () => num,
  },
  Mutation: {
    vote: (_, { val }, { pubsub }) => {
      if (val) {
        num += 1;
        pubsub.publish('voteUpdate', { voteUpdate: num });
      }
      return num;
    },
    addUser,
    login,
    addPoll
  },
  Subscription: {
    voteUpdate: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('voteUpdate'),
    },
    pollDetails: {
      subscribe: (_, __, { currentUser, pubsub }) => {
        logger.info(`${currentUser.username} subscribed to pollDetails`);
        return pubsub.asyncIterator('pollDetails');
      },
    },
  },
};
