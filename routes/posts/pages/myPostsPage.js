const router = require('express').Router();
const { protectedRoute } = require('@middleware/auth');
const { getUserPosts } = require('@services/posts');

router.get('/:id', protectedRoute(['user', 'admin']), getUserPosts, async (req, res, next) => {
  const posts = req.posts;
  const user = req._auth;

  try {
    res.render('my_posts', { posts, user });
  } catch (err) {
    next(err);
  }
});
module.exports = {
  router,
};
