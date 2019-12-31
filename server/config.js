/**
 * make appropriate changes according to your own dbms 
 */

var path = require('path')

exports.config = {
    debug : true,
    port : 4000,
    postgres : {
        host : 'localhost',
        username : '',
        password : '',
        database : '',
        port : 5432
    },
    error_log_file: 'errors.txt',
    debug_log_file: 'debug.txt',
    jwt_secret_key: 'vote@mun2020'
}
