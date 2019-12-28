/**
 * vote_val - 1 Yes, 0 No, 2 Abstain
 */

const logger = require('../winston')

var User = require('./user.model')
var Poll = require('./poll.model')
var Sequelize = require('sequelize')
var { sequelize } = require('../common/postgres')

var Vote =  sequelize.define('Vote',{
        vote_val: { 
            type : Sequelize.INTEGER 
        }
    })

Vote.sync({ force: true }).then(() => {
    logger.info("synced the vote model")
}).catch((err)=>{
    logger.error(err.message)
});        

module.exports = Vote
