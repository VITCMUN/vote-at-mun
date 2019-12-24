/**
 * vote_val - 1 Yes, 0 No, 2 Abstain
 */

var User = require('./user.model')
var Poll = require('./poll.model')
var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')

var Vote =  sequelize.define('Vote',{
        vote_val: { 
            type : Sequelize.NUMBER 
        }
    })

module.exports = Vote
