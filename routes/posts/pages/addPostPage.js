const { protectedRoute } = require('@middleware/auth');

const router = require('express').Router();

router.get('/', protectedRoute(['user', 'admin']), async (req, res) => {
  try {
    const user = req._auth;

    res.render('addPost', { user });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
