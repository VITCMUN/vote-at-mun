/*
 * voting_type - 1 all voting , 0 all not voting
 */

const Sequelize = require('sequelize');
const { sequelize } = require('../common/postgres');
const Vote = require('./vote.model');

const Poll = sequelize.define('Poll', {
  voting_type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaulValue: 0,
  },

  total_speaker_time: {
    type: Sequelize.INTEGER,
  },

  title: {
    type: Sequelize.STRING,
  },

  description: {
    type: Sequelize.STRING,
  },

  raised_by: {
    type: Sequelize.STRING,
  }
});

Poll.hasMany(Vote);

module.exports = Poll;
