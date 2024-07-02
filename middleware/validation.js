const yup = require('yup');
const { HTTP_STATUS_CODES } = require('@utils/constants');

async function validateCommentData(req, res, next) {
  const commentsSchema = yup.object({
    comment: yup.string().required().min(3),
  });

  try {
    await commentsSchema.validate(req.body);
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.BAD_REQUEST_400;
    next(err);
  }
}

async function validatePostData(req, res, next) {
  const postSchema = yup.object({
    title: yup.string().required().min(1),
    description: yup.string().required().min(1),
  });

  try {
    await postSchema.validate(req.body);
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.BAD_REQUEST_400;
    next(err);
  }
}

async function validateUserData(req, res, next) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const userSchema = yup.object({
    username: yup.string().required().min(2),
    email: yup.string().required().matches(emailRegex, 'Invalid email address'),
    password: yup.string().min(4),
  });

  try {
    await userSchema.validate(req.body);
    next();
  } catch (err) {
    req.status = HTTP_STATUS_CODES.BAD_REQUEST_400;
    next(err);
  }
}

module.exports = {
  validateCommentData,
  validatePostData,
  validateUserData,
};
