var { config } = require('../config')
var Sequelize = require('sequelize')

exports.sequelize = new Sequelize(
    config.postgres.database,
    config.postgres.username,
    config.postgres.password,{
        host : config.postgres.host,
        dialect : 'postgres',
        port : config.postgres.port,
    }

)

