const { User, Post, Comment } = require('@db/mongo');
const { HTTP_STATUS_CODES } = require('@utils/constants');
const { hashPassword, checkPassword, issueJwt } = require('@helpers/auth');
const { logger } = require('@utils/logger');

async function authenticateUser(req, res, next, email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('User not found');
      res.status(HTTP_STATUS_CODES.UNAUTHORIZED_401).send('User not found');
      return;
    }

    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      logger.warn('Incorrect password for user');
      res.status(HTTP_STATUS_CODES.UNAUTHORIZED_401).send('Incorrect password');
      return;
    }

    const token = issueJwt({ id: user.id, role: user.role });
    res.cookie('token', token, { httpOnly: true });
    logger.info(`User with email ${email} authenticated successfully`);
    next();
  } catch (err) {
    logger.error(`Error authenticating user: ${err.message}`);
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    req.users = await User.find();
    logger.info('Retrieved all users successfully');
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.NOT_FOUND_404;
    logger.error(`Error retrieving all users: ${err.message}`);
    next(err);
  }
}

async function createUser(req, res, next) {
  const { password, email, username } = req.body;
  const hash = await hashPassword(password);
  try {
    req.users = await User.create({ password: hash, email, username, role: "user" });
    logger.info('User created successfully');

    await authenticateUser(req, res, next, email, password);
  } catch (err) {
    logger.error(`Error creating user: ${err.message}`);
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { user_id } = req.body;
  try {
    await User.deleteOne({ _id: user_id });
    await Post.deleteMany({ user_id });
    await Comment.deleteMany({ user_id });
    logger.info(`User with ID ${user_id} deleted successfully`);
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.NOT_FOUND_404;
    logger.error(`Error deleting user: ${err.message}`);
    next(err);
  }
}

async function findUser(req, res, next) {
  const { password, email } = req.body;
  try {
    await authenticateUser(req, res, next, email, password);
  } catch (err) {
    req.status = HTTP_STATUS_CODES.NOT_FOUND_404;
    logger.error(`Error finding user: ${err.message}`);
    next(err);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  findUser,
  deleteUser,
};
