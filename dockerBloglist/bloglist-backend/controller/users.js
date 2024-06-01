const bcrypt = require('bcrypt');
const User = require('../models/user');
const userRouter = require('express').Router();

userRouter.get('/', async (request, response) =>
{
  const users = await User.find({}).populate('blogs', { url: true, title: true, author: true });
  response.json(users);
})

const passwordValidator = (password) =>
{
  if (typeof password != 'string')
    return false;
  else if (password.length < 3)
    return false;
  return true;
}

userRouter.post('/', async (request, response) =>
{
  // fields are username, name, password
  const body = request.body;

  if (!passwordValidator(body.password))
  {
    response.status(400).json({ error: "Password validation failed. Use at least 3 letters." }).end();
    return;
  }
  const saltRounds = 5;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
})

module.exports = userRouter;
