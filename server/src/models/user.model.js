/*
 * GUIDELINES
 * stance - 0 present, 1 present and voting,
 * user_type - 0 delegate, 1 executive board, 2 admin
 */

const Sequelize = require('sequelize');
const { sequelize } = require('../common/postgres');
const Vote = require('./vote.model');

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  profile_pic_url: {
    type: Sequelize.STRING,
  },
  stance: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  observer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

User.hasMany(Vote);

module.exports = User;
