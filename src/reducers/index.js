import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from '../account/authentication.reducer';

const Reducers = combineReducers({
  account,
  routing: routerReducer
});

export default Reducers;
