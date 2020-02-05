const { createLogger, format, transports } = require('winston');
const moment = require('moment-timezone');
const { config } = require('./config');

const { combine, colorize, printf } = format;

const logFormat = printf(
  info => `(${info.timestamp}) [${info.level}] ${JSON.stringify(info.message)}`
);

const timestamp = format(info => {
  const infoCpy = info;
  infoCpy.timestamp = moment()
    .tz('Asia/Kolkata')
    .format('MMM Do YYYY h:m:s A z');
  return infoCpy;
});

const transportsList = [
  new transports.File({
    level: 'error',
    filename: config.errorLogFile,
  }),
  new transports.File({
    level: 'debug',
    filename: config.debugLogFile,
  }),
  new transports.File({
    level: 'info',
    filename: config.infoLogFile,
  }),
];

const logger = createLogger({
  format: combine(colorize(), timestamp(), logFormat),
  transports: transportsList,
});

module.exports = logger;
