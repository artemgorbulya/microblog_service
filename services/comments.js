const { Comment } = require('@db/mongo');
const { ObjectId } = require('mongodb');
const { HTTP_STATUS_CODES } = require('@utils/constants');
const { logger } = require('@utils/logger');

async function getCommentsById(req, res, next) {
  try {
    const comments = await Comment.find({ post_id: new ObjectId(req.params.id) }).populate('user_id');
    req.comments = comments;
    logger.info(`Retrieved comments for post with ID: ${req.params.id}`);
    next();
  } catch (err) {
    logger.error(`Error retrieving comments: ${err.message}`);
    next(err);
  }
}

async function createComment(req, res, next) {
  const user = req._auth;
  const { id: user_id } = user;
  const { comment, post_id } = req.body;
  try {
    await Comment.create({
      comment,
      user_id,
      post_id,
    });
    logger.info(`Comment created for post with ID: ${post_id}`);
    next();
  } catch (err) {
    logger.error(`Error creating comment: ${err.message}`);
    req.status = HTTP_STATUS_CODES.BAD_REQUEST_400;
    next(err);
  }
}

module.exports = {
  getCommentsById,
  createComment,
};
