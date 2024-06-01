const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

// just have problem with multiple files using supertest
const api = supertest(app);

describe('blog api part', () =>
{
  beforeEach(async () =>
  {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map(b => new Blog(b));
    const promiseArray = blogObjects.map(b => b.save());
    const results = await Promise.all(promiseArray);
  });

  describe('exercise 4.8', () =>
  {
    test('application returns the correct amount of blog posts', async () =>
    {
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('exercise 4.9', () =>
  {
    test('unique identifier is named id', async () =>
    {
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const allBlogs = response.body;
      for (let i = 0; i < allBlogs.length; i++)
      {
        const element = allBlogs[i];
        expect(element.id).toBeDefined();
      }
    })
  })

  // describe('exercise 4.10', () =>
  // {
  //   test('HTTP POST makes a new blog post', async () =>
  //   {
  //     const newBlog = {
  //       title: "Advance wars",
  //       author: "Nitendo",
  //       url: "https://www.youtube.com/watch?v=fftL_XeK2qU",
  //       likes: 3
  //     };

  //     const response = await api.post('/api/blogs')
  //       .send(newBlog)
  //       .expect(201)
  //       .expect('Content-Type', /application\/json/);

  //     const blogsAtEnd = await helper.blogsInDb();
  //     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  //     let theNewBlog = { ...newBlog, id: response.body.id };
  //     expect(blogsAtEnd).toContainEqual(theNewBlog);
  //   })
  // });

  // describe('exercise 4.11', () =>
  // {
  //   test('missing like is 0', async () =>
  //   {
  //     const withoutLikes = {
  //       title: "Advance wars",
  //       author: "Nitendo",
  //       url: "https://www.youtube.com/watch?v=fftL_XeK2qU"
  //     };

  //     const response = await api.post('/api/blogs')
  //       .send(withoutLikes)
  //       .expect(201)
  //       .expect('Content-Type', /application\/json/);

  //     const blogsAtEnd = await helper.blogsInDb();
  //     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  //     const theNewBlog = { ...withoutLikes, likes: 0, id: response.body.id };
  //     expect(blogsAtEnd).toContainEqual(theNewBlog);
  //   })
  // })

  // describe('exercise 4.12', () =>
  // {
  //   test('title and url properties are missing', async () =>
  //   {
  //     const notValid = {
  //       title: "Advance wars",
  //       author: "Nitendo"
  //     }

  //     const response = await api.post('/api/blogs')
  //       .send(notValid)
  //       .expect(400);
  //   })
  // })

  // describe('exercise 4.13', () =>
  // {
  //   test('test delete', async () =>
  //   {
  //     const response1 = await api.get('/api/blogs');

  //     const id = response1.body[0].id;

  //     await api.delete(`/api/blogs/${id}`)
  //       .expect(204)

  //     await api.delete(`/api/blogs/${id}`)
  //       .expect(204)

  //     const response = await api.get('/api/blogs')
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/);
  //     expect(response.body).toHaveLength(helper.initialBlogs.length - 1);
  //   })
  // })

  describe('exercise 4.14', () =>
  {
    test('test update', async () =>
    {
      const response1 = await api.get('/api/blogs');
      const stBlog = response1.body[0];

      let newBlog = { likes: stBlog.likes + 20 };
      const returned = await api.put(`/api/blogs/${stBlog.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(returned.body.likes).toBe(stBlog.likes + 20);
    })
  })
});

describe('user api part', () =>
{
  // store all tokens for auth
  let logins = [];
  let tokens = [];

  beforeAll(async () =>
  {
    await User.deleteMany({});
    for (let i = 0; i < helper.initialUsers.length; i++)
    {
      const element = helper.initialUsers[i];
      await api.post('/api/users').send(element); // user password needs hash

      // retrieve auth tokens
      const response = await api.post('/api/login').send(element);
      logins.push(response.body);
      tokens.push(response.body.token);
    }
  });

  beforeEach(async () =>
  {
    await Blog.deleteMany({});
    for (let i = 0; i < helper.initialBlogs.length; i++)
    {
      const element = helper.initialBlogs[i];
      await api.post('/api/blogs').auth(tokens[i % tokens.length], { type: 'bearer' }).send(element);
    }
  });

  describe('exercise 4.16', () =>
  {
    test('invalid users are not created', async () =>
    {
      const newUser = { username: 'Zest', name: 'unknown', password: 'moremoney' }; // valid user profile
      const newUser2 = { username: 'byun', name: 'guanyu', password: 'rm' }; // too short password
      const newUser3 = { username: 'bL', name: 'notitle', password: 'rtmg' }; // too short username
      const response = await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const users = await helper.usersInDb();
      expect(users.length).toBe(helper.initialUsers.length + 1);

      await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      await api.post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      await api.post('/api/users')
        .send(newUser3)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('exercise 4.23 fix those failed because of auth', () =>
  {

    describe('exercise 4.10', () =>
    {
      test('HTTP POST makes a new blog post', async () =>
      {
        const newBlog = {
          title: "Advance wars",
          author: "Nitendo",
          url: "https://www.youtube.com/watch?v=fftL_XeK2qU",
          likes: 3
        };

        const response = await api.post('/api/blogs')
          .set('Authorization', `Bearer ${tokens[0]}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        let theNewBlog = { ...newBlog, id: response.body.id, user: response.body.user }; // add user
        expect(blogsAtEnd).toContainEqual(theNewBlog);
      });
    });

    describe('exercise 4.11', () =>
    {
      test('missing like is 0', async () =>
      {
        const withoutLikes = {
          title: "Advance wars",
          author: "Nitendo",
          url: "https://www.youtube.com/watch?v=fftL_XeK2qU"
        };

        const response = await api.post('/api/blogs')
          .auth(tokens[0], { type: 'bearer' })
          .send(withoutLikes)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        const theNewBlog = { ...withoutLikes, likes: 0, id: response.body.id, user: response.body.user };
        expect(blogsAtEnd).toContainEqual(theNewBlog);
      });
    });

    describe('exercise 4.12', () =>
    {
      test('title and url properties are missing', async () =>
      {
        const notValid = {
          title: "Advance wars",
          author: "Nitendo"
        }

        const response = await api.post('/api/blogs')
          .auth(tokens[0], { type: 'bearer' })
          .send(notValid)
          .expect(400);
      });
    });

    describe('exercise 4.13', () =>
    {
      test('test delete', async () =>
      {
        const response1 = await api.get('/api/blogs');

        const id = response1.body[0].id;

        await api.delete(`/api/blogs/${id}`)
          .expect(401)

        await api.delete(`/api/blogs/${id}`)
          .auth(tokens[0], { type: 'bearer' })
          .expect(204)

        await api.delete(`/api/blogs/${id}`)
          .auth(tokens[0], { type: 'bearer' })
          .expect(204)

        const response = await api.get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/);
        expect(response.body).toHaveLength(helper.initialBlogs.length - 1);
      });
    });

    describe('exercise 4.23 exclusive', () =>
    {
      test('adding a blog without token is not allowed', async () =>
      {
        const newBlog = {
          title: "Advance wars",
          author: "Nitendo",
          url: "https://www.youtube.com/watch?v=fftL_XeK2qU",
          likes: 3
        };

        const response = await api.post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/);
      });
    });
  });
});

afterAll(() =>
{
  mongoose.connection.close();
});
