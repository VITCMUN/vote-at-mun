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
  errorLogFile: 'server/log/errors.txt',
  debugLogFile: 'server/log/debug.txt',
  jwtSecretKey: 'vote@mun2020',
  saltRounds: 10,
};
