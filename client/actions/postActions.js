import axios from 'axios';
import { ALL_TRACES, SAVE_TRACE } from '../constants/constants';

const newTrace = post => (
  {
    type: SAVE_TRACE,
    post
  }
);

const allTraces = traces => (
  {
    type: ALL_TRACES,
    traces
  }
);

// const postFailure= error => (
//   {
//     type: POST_FAILURE,
//     error
//   }
// );


/**
 * @param {any} newpost 
 * @returns {object} action
 */
export function savePostAction(newpost) {
  return dispatch => (
    axios.post('/api/v1/trace', newpost)
  ).then((res) => {
    dispatch(newTrace(res.data.traces));
    return true;
  }, ({ response }) => {
    console.log(response);
    return false;
  });
}

export function getTracesAction() {
  return dispatch => (
    axios.get('/api/v1/trace')
  ).then((res) => {
    dispatch(allTraces(res.data.traces))
  }, ({ response }) => {

  });
}
