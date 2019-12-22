/**  GUIDELINES 
   * stance - 0 present, 1 present and voting,
   * user_type - 0 delegate, 1 executive board, 2 admin
*/

var Sequelize = require('sequelize')
var sequelize = require('../common/postgres')

var User =  sequelize.define('User', {
        username:{
            type : Sequelize.DataTypes.STRING,
            primaryKey : true 
        },
        
        password: {
            type : Sequelize.DataTypes.STRING
        },
        user_type: {
            type : Sequelize.DataTypes.NUMBER
        },

        profile_pic_url:{ 
            type : Sequelize.DataTypes.STRING
        },
        stance: {
            type : Sequelize.DataTypes.NUMBER 
        }
})

module.exports = User


