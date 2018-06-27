import {
  photosTypes
} from '../actions/types';

const initial_state = {
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case photosTypes.LOADED:
      return {
        ...state,
        [action.album]: action.payload
      };

    case photosTypes.SAVE:
      return {
        ...state,
        [action.album]: state[action.album].push(action.payload)
      };

    default:
      return state
  }
}
