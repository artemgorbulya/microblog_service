const { verifyJwt } = require('@helpers/auth');
const { logger } = require('@utils/logger');

function jwtParser(req, resp, next) {
  const { token = '' } = req.cookies;
  const payload = verifyJwt(token);

  req._auth = payload;
  next();
}

const protectedRoute = (allowedRoles = [], redirectTo = '/login') =>
  function (req, resp, next) {
    const { role = 'unsigned' } = req._auth || {};

    if (!allowedRoles.includes(role)) {
      logger.error(`Role [${role}] is not allowed for [${req.url}]`);
      return resp.redirect(redirectTo);
    }

    next();
  };

module.exports = {
  jwtParser,
  protectedRoute,
};
