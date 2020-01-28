const { PubSub } = require('apollo-server');
const { addUser } = require('./addUser.resolver');
const { login } = require('./login.resolver');
const { addPoll } = require('./addPoll.resolver');

const pubsub = new PubSub();

let num = 0;

module.exports = {
  Query: {
    nvotes: () => num,
  },
  Mutation: {
    vote: (_, { val }) => {
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
      subscribe: () => pubsub.asyncIterator('voteUpdate'),
    },
  },
};
