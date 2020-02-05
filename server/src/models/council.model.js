const Sequelize = require('sequelize');
const { sequelize } = require('../common/postgres');

exports.Council = sequelize.define('Council', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  banner_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
