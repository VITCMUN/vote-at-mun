/**
 * vote_val - 1 Yes, 0 No, 2 Abstain
 */

var User = require('./user.model')
var Poll = require('./poll.model')
var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')

var Vote =  sequelize.define('Vote',{
        vote_val: { 
            type : Sequelize.DataTypes.NUMBER 
        },
        timestamp: { 
            type : Sequelize.DataTypes.TIME 
        }
    })

Vote.belongsTo(Poll, {foreignKey : {
        name : 'vote_poll_type',
        field : 'vote_poll_type',
      }})

Vote.belongsTo(User, {foreignKey : {
        name : 'username',
        field : 'cast_by',
      }})
             

module.exports = Vote
