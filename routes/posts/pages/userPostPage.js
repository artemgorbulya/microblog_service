const router = require('express').Router();
const { getPostById } = require('@services/posts');
const { getCommentsById } = require('@services/comments');
const { protectedRoute } = require('@middleware/auth');

router.get('/:id', protectedRoute(['user', 'admin']), getPostById, getCommentsById, async (req, res) => {
  try {
    const post = req.post;
    const comments = req.comments;
    const user = req._auth;

    res.render('post', { post, comments, user });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
