import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxPromise from 'redux-promise';

import Routes from './routes';
import rootReducer from './reducers';

import './index.css';

const middleware = applyMiddleware(ReduxPromise, createLogger());

export const store = createStore(
  rootReducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
