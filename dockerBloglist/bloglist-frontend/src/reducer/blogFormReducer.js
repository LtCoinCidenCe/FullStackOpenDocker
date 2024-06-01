const initialValue = { title: '', author: '', url: '' };
const blogFormReducer = (state = initialValue, action) =>
{
  switch (action.type)
  {
    case 'SET_TITLE':
      return { ...state, title: action.title };
    case 'SET_AUTHOR':
      return { ...state, author: action.author };
    case 'SET_URL':
      return { ...state, url: action.url };
    case 'CLEARBLOGFORM':
      return initialValue;
    default:
      return state;
  }
};

export const setTitleAction = (title) =>
{
  return { type: 'SET_TITLE', title };
};

export const setAuthorAction = (author) =>
{
  return { type: 'SET_AUTHOR', author };
};

export const setURLAction = (url) =>
{
  return { type: 'SET_URL', url };
};

export const clearBlogForm = () =>
{
  return { type: 'CLEARBLOGFORM' };
};

export default blogFormReducer;
