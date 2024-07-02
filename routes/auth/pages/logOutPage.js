const router = require('express').Router();

router.get('/', async (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = {
  router,
};
