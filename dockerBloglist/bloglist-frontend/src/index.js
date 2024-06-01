import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import notificationReducer from './reducer/notificationReducer';
import timerReducer from './reducer/timerReducer';
import blogsReducer from './reducer/blogsReducer';
import logininfoReducer from './reducer/logininfoReducer';
import userReducer from './reducer/userReducer';
import blogFormReducer from './reducer/blogFormReducer';

const combinedReducer = combineReducers({
  notification: notificationReducer,
  timer: timerReducer,
  blogs: blogsReducer,
  logininfo: logininfoReducer,
  user: userReducer,
  blogform: blogFormReducer
});

const store = createStore(combinedReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className='container'>
        <App />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
