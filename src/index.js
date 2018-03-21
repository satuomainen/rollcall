import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import Routes from './routes';
import rootReducer from './reducers';

import './index.css';

const middleware = applyMiddleware(thunk, createLogger());

export const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
