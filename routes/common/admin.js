const { protectedRoute } = require('@middleware/auth');
const { getAllUsers } = require('@services/users');

const router = require('express').Router();

router.get('/', protectedRoute(['admin'], '/'), getAllUsers, async (req, res) => {
  const user = req._auth;
  const users = req.users;

  try {
    res.render('admin', { users, user });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
