import isEmpty from 'lodash/isEmpty';
import { SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from '../constants/constants';

const initialState = {
  isAuthenticate: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SIGN_IN:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
}