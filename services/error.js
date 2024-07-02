const { HTTP_STATUS_CODES } = require('@utils/constants');
const { logger } = require('@utils/logger');

function routerError(err, req, res) {
  logger.error(`Error occurred: ${err.message}`);
  res.status(req.status || HTTP_STATUS_CODES.BAD_REQUEST_400).send({ error: err.message });
}

module.exports = {
  routerError,
};
