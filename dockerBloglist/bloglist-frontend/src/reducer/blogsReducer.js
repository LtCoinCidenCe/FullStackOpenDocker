const blogsReducer = (state = [], action) =>
{
  switch (action.type)
  {
    case 'NEW':
      return [...state, action.data].sort((a, b) => b.likes - a.likes);
    case 'INIT':
      return [...action.data].sort((a, b) => b.likes - a.likes);
    case 'LIKE': {
      const data = action.data;
      return state.map(blog => blog.id !== data.id ? blog : data)
        .sort((a, b) => b.likes - a.likes);
    }
    case 'DELETE':
      return state.filter(blog => blog.id !== action.id);
    default:
      return state;
  }
};

export const createAction = (blog) =>
{
  return {
    type: 'NEW',
    data: blog
  };
};

export const initblogsAction = (data) =>
{
  return {
    type: 'INIT',
    data: data
  };
};

export const likeAction = (data) =>
{
  return {
    type: 'LIKE',
    data: data
  };
};

export const deleteAction = (id) =>
{
  return {
    type: 'DELETE',
    id
  };
};

export default blogsReducer;