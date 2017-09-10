import axios from 'axios';
import { ALL_STORIES, SAVE_STORY } from '../constants/constants';

const newStory = story => (
  {
    type: SAVE_STORY,
    story
  }
);

const allStories = stories => (
  {
    type: ALL_STORIES,
    stories
  }
);

/**
 * @param {any} newpost
 * @returns {object} action
 */
export function savePostAction(newpost) {
  return dispatch => (
    axios.post('/api/v1/posts', newpost)
  ).then((res) => {
    console.log(res.data.story)
    dispatch(newStory(res.data.story));
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
    dispatch(allStories(res.data.stories));
  }, ({ response }) => {
    console.log(response);
  });
}
