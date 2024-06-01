const notificationReducer = (state = '', action) =>
{
  switch (action.type)
  {
    case 'SET_N':
      return action.data;
    case 'CLEAR_N':
      return '';
    default:
      return state;
  }
};

export const setNotificationAction = (message) =>
{
  return {
    type: 'SET_N',
    data: message
  };
};

export const initNotificationAction = () =>
{
  return { type: 'CLEAR_N' };
};

export default notificationReducer;
