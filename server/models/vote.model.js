/**
 * vote_val - 1 Yes, 0 No, 2 Abstain
 */

const Sequelize = require('sequelize');
const { sequelize } = require('../common/postgres');

const Vote = sequelize.define('Vote', {
  vote_val: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Vote;
