const userReducer = (state=null, action) =>
{
  switch (action.type)
  {
    case 'SETUSER':
      return action.user;
    case 'CLEARUSER':
      return null;
    default:
      return state;
  }
};

export const setUserAction = (user) =>
{
  return { type: 'SETUSER', user: user };
};

export const clearUserAction = () =>
{
  return { type: 'CLEARUSER' };
};

export default userReducer;
