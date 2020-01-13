const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const logger = require('winston');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const apiRouter = require('./routes/api.routes');
const authMiddleware = require('./middleware/auth.middleware');
const { sequelize } = require('./common/postgres');
const { typeDefs } = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers');
const user = require('./models/user.model');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      User: user,
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

require('./passport/passport');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/auth', authRouter);
app.use('/api', authMiddleware.jwt_auth, apiRouter);

httpServer.listen(PORT, () => {
  logger.info(`Server ready at http//localhost${PORT}${server.graphqlPath}`);
  logger.info(
    `Subscriptions ready at ws//localhost${PORT}${server.subscriptionsPath}`
  );
});
