import isEmpty from 'lodash/isEmpty';
import { SAVE_TRACE, ALL_TRACES } from '../constants/constants';

const initialState = {
  trace: []
};

/* 
  Post Reducer
*/
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TRACE:
      return [
        action.post,
        ...state
      ];
    case ALL_TRACES:
      return [
        ...action.traces
      ];
    default:
      return state;
  }
};
