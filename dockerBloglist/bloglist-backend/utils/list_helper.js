const dummy = (blogs) =>
{
  return 1;
}

const totalLikes = (blogs) =>
{
  const total = blogs.reduce(
    (value1, value2) => { return value1 + value2.likes; },
    0);
  return total;
}

const favoriteBlog = (blogs) =>
{
  let initValue = blogs[0];
  delete initValue.url;
  const favorite = blogs.reduce(
    (mostLikes, newBlog) =>
    {
      if (mostLikes.likes < newBlog.likes)
      {
        const copy = {
          title: newBlog.title,
          author: newBlog.author,
          likes: newBlog.likes
        }
        return copy;
      }
      else
      {
        return mostLikes
      }
    }
    , initValue);
  return favorite;
}

const mostBlogs = (blogs) =>
{
  const authorBlogs = [];
  blogs.forEach(element =>
  {
    let thisAuthor = authorBlogs.find(ab => ab.author === element.author);
    if (thisAuthor)
      thisAuthor.blogs += 1;
    else
      authorBlogs.push({ author: element.author, blogs: 1 });
  });
  const result = authorBlogs.reduce((value1, value2) =>
  {
    if (value1.blogs < value2.blogs)
      return value2;
    else
      return value1;
  });
  return result;
}

const mostLikes = (blogs) =>
{
  const authorLikes = [];
  blogs.forEach(element =>
  {
    let thisAuthor = authorLikes.find(al => al.author === element.author);
    if (thisAuthor)
      thisAuthor.likes += element.likes;
    else
      authorLikes.push({ author: element.author, likes: element.likes });
  });
  const result = authorLikes.reduce((value1, value2) =>
  {
    if (value1.likes < value2.likes)
      return value2;
    else
      return value1;
  });
  return result;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
