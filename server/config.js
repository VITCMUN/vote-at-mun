/**
 * make appropriate changes according to your own dbms
 */

exports.config = {
  debug: true,
  port: 4000,
  postgres: {
    host: 'localhost',
    username: 'postgres',
    password: '0000',
    database: 'postgres',
    port: 5432,
  },
  error_log_file: 'server/log/errors.txt',
  debug_log_file: 'server/log/debug.txt',
  jwt_secret_key: 'vote@mun2020',
};
