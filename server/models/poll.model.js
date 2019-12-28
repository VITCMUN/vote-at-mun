/*
 * voting_type - 1 all voting , 0 all not voting 
 */

const logger = require('../winston')

var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')
var Vote = require('./vote.model')

var Poll =  sequelize.define('Poll' , {
    voting_type: { 
      type : Sequelize.INTEGER,
      allowNull: false,
      defaulValue: 0 
    },

    time_to_talk: { 
      type : Sequelize.INTEGER 
    },

    individual_speaker_time: {
      type : Sequelize.INTEGER
    },

    title: {
      type : Sequelize.STRING 
    },

  })

Poll.hasMany(Vote)

Poll.sync({ force: true }).then(() => {
    logger.info("synced the poll model")
}).catch((err)=>{
    logger.error(err.message)
});

module.exports = Poll
