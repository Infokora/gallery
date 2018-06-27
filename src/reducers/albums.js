import {
  albumsTypes
} from '../actions/types';

const initial_state = [];

export default (state = initial_state, action) => {
  switch (action.type) {
    case albumsTypes.LOADED:
      return action.payload;

    default:
      return state
  }
}
