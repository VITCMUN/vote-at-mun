/**
 * vote_val - 1 Yes, 0 No, 2 Abstain
 */

const Sequelize = require('sequelize');
const { sequelize } = require('../common/postgres');

const Vote = sequelize.define('Vote', {
  vote_val: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  voterId: {
    type: Sequelize.STRING,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'username'
    }
  },
  pollId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'Polls',
      key: 'id'
    }
  }
});

module.exports = Vote;
