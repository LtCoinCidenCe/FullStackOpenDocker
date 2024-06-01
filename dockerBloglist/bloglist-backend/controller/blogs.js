const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const userExtractor = require('../utils/middleware').userExtractor;

blogsRouter.get('/', async (request, response) =>
{
  const blogs = await Blog.find({}).populate('user', { username: true, name: true });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) =>
{
  // user is now User model
  const designatedUser = request.user;

  // handle blog
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: designatedUser._id // plus user for blog
  });
  const savedBlog = await blog.save();
  // modify user data
  designatedUser.blogs = designatedUser.blogs.concat(savedBlog._id);
  await designatedUser.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) =>
{
  // user is now User model
  const userCreator = request.user;
  // target is Blog model
  const target = await Blog.findById(request.params.id);
  if (target)
    if (target.user.toString() === userCreator.id) // is creator
    {
      userCreator.blogs = userCreator.blogs.filter(blg => blg.toString() !== target.id);
      userCreator.save();
      target.remove();
      return response.status(204).end();
    }
    else // not the original user
      return response.status(401).json({ error: 'invalid token' });
  else // document does not exist
    return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) =>
{
  const body = request.body;
  // allow update those attr except title
  const newOb = { author: body.author, url: body.url, likes: body.likes };
  const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, newOb, { new: true, runValidators: true })
    .populate('user', { username: true, name: true }); // add populate to make the response consistent
  response.json(returnedBlog);
});

blogsRouter.get('/:id/comments', async (request, response) =>
{
  const blog = await Blog.findById(request.params.id);
  return response.json(blog.comments);
})

blogsRouter.post('/:id/comments', async (request, response) =>
{
  const body = request.body;
  const originalBlog = await Blog.findById(request.params.id);
  if (!originalBlog) return response.status(404).json({ error: 'blog not found' });
  if (!originalBlog.comments) originalBlog.comments = [];
  originalBlog.comments = originalBlog.comments.concat(body.comment);
  await originalBlog.save();
  return response.status(201).json(originalBlog);
})

module.exports = blogsRouter;
