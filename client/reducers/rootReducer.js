import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import traces from './traces';

/* 
    Root Reducer
*/
export default combineReducers({
  users,
  posts,
  traces
});
