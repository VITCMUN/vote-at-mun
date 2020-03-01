const { addUser } = require('./addUser.resolver');
const { login } = require('./login.resolver');
const { addPoll } = require('./addPoll.resolver');
const { setCouncil } = require('./setCouncil.resolver');
const { vote } = require('./vote.resolver');
const { removeUser } = require('./removeUser.resolver');
const { getDelegates } = require('./getDelegates.resolver');
const { getActivePolls } = require('./getActivePolls.resolver');
const { endPoll } = require('./endPoll.resolver');
const { getPollDetails } = require('./getPollDetails.resolver');
const { getResult } = require('./getResult.resolver');
const { getCouncil } = require('./getCouncil.resolver');
const logger = require('../../winston');

module.exports = {
  Query: {
    getDelegates,
    getActivePolls,
    getPollDetails,
    getResult,
    getCouncil,
  },
  Mutation: {
    vote, // delegate
    addUser, // admin
    removeUser, // admin
    setCouncil, // admin
    login,
    addPoll, // EB
    endPoll
  },
  Subscription: {
    voteUpdate: {
      subscribe: (_, { id }, { pubsub }) => pubsub.asyncIterator(`voteUpdate${id}`),
    },
    pollDetails: {
      // delegate
      subscribe: (_, __, { currentUser, pubsub }) => {
        logger.info(`${currentUser.username} subscribed to pollDetails`);
        return pubsub.asyncIterator('pollDetails');
      }
    },
    pollEnd: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('pollEnd')
    }
  }
};
