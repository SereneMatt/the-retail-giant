// All reducers go in here

// User reducer stores state of current user

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

// One giant reducer
export default combineReducers({
  user: userReducer
});
