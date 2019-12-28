/*
 * GUIDELINES 
 * stance - 0 present, 1 present and voting,
 * user_type - 0 delegate, 1 executive board, 2 admin
 */

const logger = require('../winston')

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
            type : Sequelize.INTEGER,
            allowNull: false,
        },

        profile_pic_url:{ 
            type : Sequelize.STRING
        },
        stance: {
            type : Sequelize.INTEGER,
            allowNull: false 
        }
})

User.hasMany(Poll)
User.hasMany(Vote)

User.sync({ force: true }).then(() => {
    logger.info("synced the user model")
}).catch((err)=>{
    logger.error(err.message)
});

module.exports = User

