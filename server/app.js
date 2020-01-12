const express = require('express');
const graphqlHTTP = require('express-graphql');
const logger = require('winston');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const apiRouter = require('./routes/api.routes');
const authMiddleware = require('./middleware/auth.middleware');
const { sequelize } = require('./common/postgres').sequelize;
const schema = require('./graphql/schema/schema');

const app = express();

const PORT = process.env.WEBAPP_PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

sequelize.sync();

require('./passport/passport');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/auth', authRouter);
app.use('/api', authMiddleware.jwt_auth, apiRouter);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => logger.info('Welcome to VITCMUN 2020'));
