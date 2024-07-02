const { protectedRoute } = require('@middleware/auth');
const { getPosts } = require('@services/posts');

const router = require('express').Router();

router.get('/', protectedRoute(['user', 'admin']), getPosts, async (req, res) => {
  try {
    const posts = req.posts;
    const user = req._auth;

    res.render('main', { posts, user });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
