import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';

/* 
    Root Reducer
*/
export default combineReducers({
  users,
  posts
});
