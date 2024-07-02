const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const postsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const commentsSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  comment: { type: String, required: true },
});

module.exports = {
  userSchema,
  postsSchema,
  commentsSchema,
};
