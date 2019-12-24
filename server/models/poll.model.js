/*
 * voting_type - 1 all voting , 0 all not voting 
 */

var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')
var Vote = require('./vote.model')

var Poll =  sequelize.define('Poll' , {
    voting_type: { 
      type : Sequelize.NUMBER,
      allowNull: false,
      defaulValue: 0 
    },

    time_to_talk: { 
      type : Sequelize.NUMBER 
    },

    individual_speaker_time: {
      type : Sequelize.NUMBER
    },

    title: {
      type : Sequelize.STRING 
    },

  })

Poll.hasMany(Vote)

module.exports = Poll
