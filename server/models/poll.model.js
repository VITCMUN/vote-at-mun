/**
 * voting_type - 1 all voting , 0 all not voting 
 */

var User = require("./user.model")
var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')

var Poll =  sequelize.define('Poll' , {
    voting_type: { 
      type : Sequelize.DataTypes.STRING 
    },

    id:{
       type : Sequelize.DataTypes.STRING,
       primaryKey : true
      },

    time_to_talk: { 
      type : Sequelize.DataTypes.NUMBER 
    },

    title: { 
      type : Sequelize.DataTypes.STRING 
    },

    timestamp: { 
      type : Sequelize.DataTypes.TIME 
    }

  })

Poll.belongsTo(User, {foreignKey : {
  name: 'proposed_by',
  field: 'proposed_by'
}})

module.exports = Poll
