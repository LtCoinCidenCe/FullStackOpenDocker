const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors')

const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controller/blogs');
const middleware = require('./utils/middleware');
const userRouter = require('./controller/users');
const loginRouter = require('./controller/login');

const app = express();

logger.info('connecting to database');
mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing');
  app.use('/api/testing', testingRouter);
};
app.use(middleware.errorHandler);

module.exports = app;
