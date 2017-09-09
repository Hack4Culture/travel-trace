import { SIGN_IN } from '../constants/constants';

const signinActionCreator = user => (
  {
    type: SIGN_IN,
    user
  }
);

export default function(dispatch, user) {
  dispatch(signinActionCreator(user));
}