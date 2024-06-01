const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const userExtractor = async (request, response, next) =>
{
  // must have token
  if (request.token)
  {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (decodedToken.id) // type string
    {
      const user = await User.findById(decodedToken.id);
      if (user) // user exists
      {
        request.user = user;
        next(); // return to stop
      }
    }
  }
  else
    return response.status(401).json({ error: 'token missing or invalid' });
};

const tokenExtractor = (request, response, next) =>
{
  // can pass without a token
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    request.token = authorization.substring(7);
  next();
};

const errorHandler = (error, request, response, next) =>
{
  logger.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId')
    return response.status(400).send({ error: 'malformatted id' });
  else if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message });
  else if (error.name === 'JsonWebTokenError')
    return response.status(401).json({ error: 'invalid token' });
  else if (error.name === 'TokenExpiredError')
    return response.status(401).json({ error: 'token expired' });

  next(error);
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
