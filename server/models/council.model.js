var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')

var Council =  sequelize.define('Council',{
        name: { 
            type : Sequelize.STRING,
            allowNull: false
        },

        banner_url: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

module.exports = Council