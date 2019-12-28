const logger = require('../winston')

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

Council.sync({ force: true }).then(() => {
    logger.info("synced the poll model")
}).catch((err)=>{
    logger.error(err.message)
});

module.exports = Council