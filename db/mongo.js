const mongoose = require('mongoose');
const { db: dbConfig } = require('config');

const { userSchema, postsSchema, commentsSchema, adminSchema } = require('./schemas');

const User = mongoose.model('users', userSchema);
const Post = mongoose.model('posts', postsSchema);
const Comment = mongoose.model('comments', commentsSchema);

const mongoUrl = `mongodb+srv://${dbConfig.user}:${dbConfig.pass}@${dbConfig.host}/?retryWrites=true&w=majority&appName=${dbConfig.dbName}`;
const run = async () => {
  try {
    await mongoose.connect(mongoUrl, { dbName: dbConfig.dbName });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

run();

module.exports = {
  User,
  Post,
  Comment,
};
