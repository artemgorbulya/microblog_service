const config = require('config');
const winston = require('winston');
const path = require('path');

const LOGS_DIRECTORY = path.join('.', 'logs');

// Initialize Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: path.join(LOGS_DIRECTORY, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(LOGS_DIRECTORY, 'combined.log') }),
  ],
});

if (!config.isProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = {
  logger,
};
