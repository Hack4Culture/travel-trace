import axios from 'axios';
import { SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from '../constants/constants';

const signinActionCreator = user => (
  {
    type: SIGN_IN,
    user
  }
);

export function signinAction(user) {
  return dispatch => (
    axios.post('/api/v1/auth', user)
  ).then((res) => {
    dispatch(signinActionCreator(res.data.user))
    return true;
  }, ({ response }) => {
    console.log(response);
    dispatch(signinActionCreator({}))
    return false;
  })
}

export function signinWithToken(dispatch, token) {
  axios.post('/api/v1/auth/login', { token })
  .then((res) => {
    return dispatch(signinActionCreator(res.data.user))
  }, ({ response }) => {
    console.log(response);
    dispatch(signinActionCreator({}))
    return false
  })
}