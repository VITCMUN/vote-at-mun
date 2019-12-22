/**
 * make appropriate changes according to your own dbms 
 */

var path = require('path')

exports.config = {
    debug : true,
    port : 4000,
    postgres : {
        host : 'localhost',
        username : 'postgres',
        password : '17blc1124',
        database : 'postgres',
        port : 5432

    }
}
