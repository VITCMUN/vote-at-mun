const Sequelize = require('sequelize');
const {
  database,
  username,
  password,
  host,
  port,
} = require('../config').config.postgres;

exports.sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port,
});
