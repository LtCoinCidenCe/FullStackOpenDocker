const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
];

describe('Blog app', function ()
{
  beforeEach(function ()
  {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'Root User',
      username: 'root',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user1);

    const user2 = {
      name: 'NormalUser',
      username: 'normal',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user2);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function ()
  {
    cy.get('form').contains('username').get('#loginusername');
    cy.get('form').contains('password').get('#loginpassword');
  });

  describe('Login', function ()
  {
    it('succeeds with correct credentials', function ()
    {
      cy.get('#loginusername').type('root');
      cy.get('#loginpassword').type('secret');
      cy.get('#loginButton').click();
      cy.contains('Root User logged in');
    });

    it('fails with wrong credentials', function ()
    {
      cy.get('#loginusername').type('notroot');
      cy.get('#loginpassword').type('explicit');
      cy.get('#loginButton').click();
      cy.contains('invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function ()
  {
    beforeEach(function ()
    {
      cy.login({ username: 'root', password: 'secret' });
      // log in user here
    });

    it('A blog can be created', function ()
    {
      cy.contains('create new blog').click();
      cy.get('#ttitle').type('React patterns');
      cy.get('#tauthor').type('Michael Chan');
      cy.get('#turl').type('https://reactpatterns.com/');
      cy.get('form').contains('create').click();
      // cy.get('#submitNewBlog').click();
      cy.contains('React patterns Michael Chan');
    });

    describe('When there are ready blogs', function ()
    {
      beforeEach(function ()
      {
        for (let index = 0; index < initialBlogs.length; index++)
        {
          const element = initialBlogs[index];
          cy.createBlog(element);
        }
      });

      it('users can like a blog', function ()
      {
        cy.contains(initialBlogs[4].title).contains('view').click();
        cy.contains(initialBlogs[4].title).parent().contains('like').click();
      });

      it('owner can delete blogs', function ()
      {
        cy.contains(initialBlogs[4].title).contains('view').click();
        cy.contains(initialBlogs[4].title).parent().contains('remove').click();
      });

      it('other users can not delete blogs', function ()
      {
        cy.contains('logout').click();
        cy.get('#loginusername').type('normal');
        cy.get('#loginpassword').type('secret');
        cy.get('#loginButton').click();
        cy.contains('NormalUser logged in');
        cy.contains(initialBlogs[2].title).contains('view').click();
        cy.get('.removeBlog').should('have.css', 'display', 'none');
      });

      it.only('blogs are ordered according to likes', function ()
      {
        // click all view button
        cy.get('button.blogViewButton')
          .then(buttons =>
          {
            for (let i = 0; i < buttons.length; i++)
            {
              const btn = buttons[i];
              cy.wrap(btn).click();
            }

            cy.get('.blogLikes').then(likes =>
            {
              // shunxu paixu
              console.log(likes);
              let likesArray = likes.get().map(row => parseInt(row.childNodes[1].data));
              console.log(likesArray);
              likesArray.reduce((a, b) =>
              {
                expect(a).to.be.at.least(b);
                return b;
              });

              // let sorted = likesArray.slice().sort((a, b) => b - a);
              // expect(likesArray).to.deep.equal(sorted);
              // cy.wrap(likesArray).should('deep.equal', sorted);

              // dynamic changing likes
              cy.wrap(likes[2].childNodes[2]).as('like2');
              const maxlikes = Math.max(...initialBlogs.map(blg => blg.likes));
              for (let i = 0; i < maxlikes + 1; i++)
              {
                cy.get('@like2').click();
                cy.wait(500);
              }
            });

            // new order
            cy.get('.blogLikes').then(likes =>
            {
              // shunxu paixu
              console.log(likes);
              let likesArray = likes.get().map(row => parseInt(row.childNodes[1].data));
              console.log(likesArray);
              likesArray.reduce((a, b) =>
              {
                expect(a).to.be.at.least(b);
                return b;
              });
            });
          });
      });
    });
  });
});
