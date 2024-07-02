const router = require('express').Router();
const { verifyJwt } = require('@helpers/auth');

router.get('/', async (req, res) => {
  try {
    const { token } = req.cookies;
    const user = verifyJwt(token);

    res.render('login', { user });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
