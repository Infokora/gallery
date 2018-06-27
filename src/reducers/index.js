import {combineReducers} from 'redux';

import user from './user';
import albums from './albums';
import photos from './photos';

export const reducers = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
};

const appReducer = combineReducers({
  user,
  albums,
  photos
});
