require('dotenv').config();
require('module-alias/register');

const { server: srvConfig } = require('config');

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { logger } = require('@utils/logger');
const { jwtParser } = require('@middleware/auth');

const { router: routerUser } = require('@routes/users/users');
const { router: routesPosts } = require('@routes/posts/posts');
const { router: routesComment } = require('@routes/comments/comments');
const { router: routerAuth } = require('@routes/auth/auth');

const { router: routeMain } = require('@routes/common/main');
const { router: routePostUser } = require('@routes/posts/pages/userPostPage');
const { router: routeRegister } = require('@routes/auth/pages/registerPage');
const { router: routeLogIn } = require('@routes/auth/pages/logInPage');
const { router: routeMyPosts } = require('@routes/posts/pages/myPostsPage');
const { router: routeLogout } = require('@routes/auth/pages/logOutPage');
const { router: routeAddPost } = require('@routes/posts/pages/addPostPage');
const { router: routeAdmin } = require('@routes/common/admin');

// Define directory for storing logs
const LOGS_DIRECTORY = path.join(__dirname, 'logs');

// Check if logs directory exists, if not, create it
if (!fs.existsSync(LOGS_DIRECTORY)) {
  fs.mkdirSync(LOGS_DIRECTORY);
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(path.join(LOGS_DIRECTORY, 'access.log'), { flags: 'a' });

// Create Express application
const app = express();

// Middleware for logging HTTP requests
app.use(morgan('dev'));
app.use(morgan(':date[iso] :method :url :status', { stream: accessLogStream }));

// Middleware for serving static files
app.use('/public', express.static('static'));

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', 'views');

// Middleware for parsing JSON request bodies
const jsonBodyParser = express.json();
app.use(jsonBodyParser);

// Middleware for parsing URL-encoded request bodies
app.use(cookieParser());
app.use(jwtParser);

// Main routes
app.use('/auth', routerAuth);
app.use('/users', routerUser);
app.use('/posts', routesPosts);
app.use('/comments', routesComment);

// Pages routes
app.use('/', routeMain);
app.use('/user-post', routePostUser);
app.use('/register', routeRegister);
app.use('/login', routeLogIn);
app.use('/logout', routeLogout);
app.use('/my-posts', routeMyPosts);
app.use('/add-posts', routeAddPost);
app.use('/admin', routeAdmin);

// Start the server
app.listen(srvConfig.port, () => logger.info(`Server is listening on port ${srvConfig.port}`));
