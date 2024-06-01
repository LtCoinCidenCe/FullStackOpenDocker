const timerReducer = (state = 0, action) =>
{
  switch (action.type)
  {
    case 'SET_TIMEOUT':
      return action.data;
    default:
      return state;
  }
};

export const setTimerAction = (timeoutID) =>
{
  return {
    type: 'SET_TIMEOUT',
    data: timeoutID
  };
};

export default timerReducer;
