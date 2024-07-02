const express = require('express');
router = express.Router();
const { protectedRoute } = require('@middleware/auth');
const { createComment } = require('@services/comments');
const { routerError } = require('@services/error');
const { validateCommentData } = require('@middleware/validation');

router.post(
  '/add-comment',
  protectedRoute(['user', 'admin']),
  express.urlencoded({ extended: true }),
  validateCommentData,
  createComment,
  (req, res) => {
    res.redirect(`/user-post/${req.body.post_id}`);
  },
);

router.use(routerError);

module.exports = {
  router,
};
