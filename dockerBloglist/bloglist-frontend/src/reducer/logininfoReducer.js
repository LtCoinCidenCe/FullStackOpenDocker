const initialValues = { username: '', password: '' };
const logininfoReducer = (state = initialValues, action) =>
{
  switch (action.type)
  {
    case 'SET_USERNAME':
      return { username: action.username, password: state.password };
    case 'SET_PASSWORD':
      return { username: state.username, password: action.password };
    case 'LOGININFOINIT':
      return initialValues;
    default:
      return state;
  }
};

export const setUsernameAction = (username) =>
{
  return { type: 'SET_USERNAME', username: username };
};

export const setPasswordAction = (password) =>
{
  return { type: 'SET_PASSWORD', password: password };
};

export const logininfoInit = () =>
{
  return { type: 'LOGININFOINIT' };
};

export default logininfoReducer;
