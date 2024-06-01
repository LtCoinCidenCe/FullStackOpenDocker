const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) =>
{
  const { username, password } = request.body;
  if (username && password) // ok
  {
    const user = await User.findOne({ username });
    const passwordCorrect = user === null ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (user && passwordCorrect) // ok
    {
      const asiakkaanToken = { username: user.username, id: user._id };
      const token = jwt.sign(asiakkaanToken, process.env.SECRET);
      return response.status(200).send({ token, username: user.username, name: user.name });
    }
  }
  // not ok
  return response.status(401).json({ error: 'invalid username or password' });
});

module.exports = loginRouter;
