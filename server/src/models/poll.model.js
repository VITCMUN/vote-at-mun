/*
 * voting_type - 1 all voting , 0 all not voting
 */

const Sequelize = require('sequelize');
const { sequelize } = require('../common/postgres');
const Vote = require('./vote.model');

const Poll = sequelize.define('Poll', {
  total_speaker_time: {
    type: Sequelize.INTEGER
  },

  title: {
    type: Sequelize.STRING
  },

  description: {
    type: Sequelize.STRING
  },

  raised_by: {
    type: Sequelize.STRING
  },

  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },

  two_thirds_majority: {
    type: Sequelize.BOOLEAN,
  },

  username_filter: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

Poll.hasMany(Vote);

module.exports = Poll;
