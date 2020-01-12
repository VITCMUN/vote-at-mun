const { PubSub } = require('apollo-server');

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
        pubsub.publish('vote_update', { vote_update: num });
      }
      return num;
    },
  },
  Subscription: {
    vote_update: {
      subscribe: () => pubsub.asyncIterator('vote_update'),
    },
  },
};
