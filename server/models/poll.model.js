/**
 * voting_type - 1 all voting , 0 all not voting 
 */

const logger = require('../winston')


var User = require("./user.model")
var Sequelize = require('sequelize')
var { sequelize } = require('../common/postgres')

var Poll =  sequelize.define('Poll' , {
    voting_type: { 
      type : Sequelize.DataTypes.STRING 
    },

    id:{
       type : Sequelize.DataTypes.STRING,
       primaryKey : true
      },

    time_to_talk: { 
      type : Sequelize.DataTypes.INTEGER
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

Poll.sync({ force: true }).then(() => {
    logger.info("synced the poll model")
}).catch((err)=>{
    logger.error(err.message)
});

module.exports = Poll
