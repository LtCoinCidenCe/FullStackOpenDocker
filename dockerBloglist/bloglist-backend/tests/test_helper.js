const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const initialUsers = [
  { username: 'ccc', name: 'CoinCidenCe', password: 'kss' },
  { username: 'Lee', name: 'FlaSh', password: 'god' },
  { username: 'Wong', name: 'Parting', password: 'pro' },
  { username: 'Kim', name: 'Classic', password: 'long' },
]

const nonExistingId = async () =>
{
  const blog = new Blog({
    title: "Advance wars",
    author: "Nitendo",
    url: "https://www.youtube.com/watch?v=fftL_XeK2qU",
    likes: 3
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
}

const blogsInDb = async () =>
{
  const blogs = await Blog.find({});
  // fix user field Object
  const blogToJson = (blog) =>
  {
    // this field doesn't vi*usti change it if in the reversed order
    let temp = blog.toJSON();
    temp.user = temp.user.toString();
    return temp;
  }
  return blogs.map(blogToJson);
}

const usersInDb = async () =>
{
  const users = await User.find({});
  // fix blogs field Object
  const userToJson = (user) =>
  {
    let temp = user.toJSON();
    temp.blogs = temp.blogs.map(id => id.toString());
    return temp;
  }
  return users.map(userToJson);
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}
