const { Post, Comment } = require('@db/mongo');
const { ObjectId } = require('mongodb');
const { HTTP_STATUS_CODES } = require('@utils/constants');
const { logger } = require('@utils/logger');

async function getPosts(req, res, next) {
  try {
    req.posts = await Post.find().populate('user_id').sort({ createdAt: -1 });
    logger.info('Retrieved posts successfully');
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.NOT_FOUND_404;
    logger.error(`Error retrieving posts: ${err.message}`);
    next(err);
  }
}

async function getUserPosts(req, res, next) {
  try {
    const posts = await Post.find({
      user_id: new ObjectId(req.params.id),
    })
      .populate('user_id')
      .sort({ createdAt: -1 });
    req.posts = posts;
    logger.info(`Retrieved posts for user with ID ${req.params.id} successfully`);
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.NOT_FOUND_404;
    logger.error(`Error retrieving user posts: ${err.message}`);
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    req.post = await Post.findById(req.params.id).populate('user_id');
    logger.info(`Retrieved post with ID ${req.params.id} successfully`);
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.NOT_FOUND_404;
    logger.error(`Error retrieving post by ID: ${err.message}`);
    next(err);
  }
}

async function createPost(req, res, next) {
  const user = req._auth;
  const { id: user_id } = user;
  const { title, description } = req.body;

  try {
    const post = await Post.create({ user_id, title, description });
    req.post = post;
    logger.info('Post created successfully');
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.BAD_REQUEST_400;
    logger.error(`Error creating post: ${err.message}`);
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    await Post.deleteOne({ _id: req.params.id });
    await Comment.deleteMany({ post_id: req.params.id });
    logger.info(`Post with ID ${req.params.id} deleted successfully`);
    next();
  } catch (err) {
    logger.error(`Error deleting post: ${err.message}`);
    next(err);
  }
}

module.exports = {
  getPosts,
  createPost,
  getPostById,
  getUserPosts,
  deletePost,
};
