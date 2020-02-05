const { ApolloServer, PubSub } = require('apollo-server');
const logger = require('winston');
const { sequelize } = require('./common/postgres');
const { typeDefs } = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers');
const { User, Poll, Council } = require('./models/index');
const { getUser } = require('./common/userAuth');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: connectionParams => {
      if (connectionParams.authToken) {
        const token = connectionParams.authToken || '';
        const currentUser = getUser(token);
        if (!currentUser) {
          throw new Error('Not Authenticated');
        }
        return {
          currentUser,
          pubsub
        };
      }
      throw new Error('Missing Auth Token');
    },
  },
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }
    const token = req.headers.authorization || '';
    const currentUser = getUser(token);
    return {
      currentUser,
      User,
      Poll,
      Council,
      pubsub,
    };
  },
  cors: true,
  debug: true,
  playground: true,
});

const PORT = process.env.WEBAPP_PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

sequelize.sync();

server.listen(PORT).then(({ url, subscriptionsUrl }) => {
  logger.info(`Server ready at ${url}`);
  logger.info(`Subscriptions ready at ${subscriptionsUrl}`);
});
