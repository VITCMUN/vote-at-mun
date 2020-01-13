const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const logger = require('winston');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize } = require('./common/postgres');
const { typeDefs } = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers');
const user = require('./models/user.model');
const { jwtSecretKey } = require('./config').config;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      User: user,
    };
  },
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const userInstance = () => {
      try {
        if (token) {
          return jwt.verify(token, jwtSecretKey);
        }
        return null;
      } catch (err) {
        return null;
      }
    };
    return {
      userInstance: userInstance(),
    };
  },
});

const PORT = process.env.WEBAPP_PORT || 3000;

server.applyMiddleware({ app });

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

sequelize.sync();

app.use(cors());

httpServer.listen(PORT, () => {
  logger.info(`Server ready at http//localhost${PORT}${server.graphqlPath}`);
  logger.info(
    `Subscriptions ready at ws//localhost${PORT}${server.subscriptionsPath}`
  );
});
