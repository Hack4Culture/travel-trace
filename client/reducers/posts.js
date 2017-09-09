import isEmpty from 'lodash/isEmpty';
import { POST_SUCCESS, POST_FAILURE } from '../constants/constants';

const initialState = {
  trace: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case POST_SUCCESS:
      return [
        action.post,
        ...state
      ]
    default:
      return state;
  }
}