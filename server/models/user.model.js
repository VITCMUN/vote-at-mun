/*
 * GUIDELINES 
 * stance - 0 present, 1 present and voting,
 * user_type - 0 delegate, 1 executive board, 2 admin
 */

var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')
var Poll = require('./poll.model')
var Vote = require('./vote.model')

var User =  sequelize.define('User', {
        username:{
            type : Sequelize.CITEXT,
            primaryKey : true 
        },
        
        password: {
            type : Sequelize.STRING,
            allowNull: false
        },
        user_type: {
            type : Sequelize.NUMBER,
            allowNull: false,
        },

        profile_pic_url:{ 
            type : Sequelize.STRING
        },
        stance: {
            type : Sequelize.NUMBER,
            allowNull: false 
        }
})

User.hasMany(Poll)
User.hasMany(Vote)

module.exports = User


