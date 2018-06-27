import {
  usersTypes
} from '../actions/types';

const initial_state = {

};

export default (state = initial_state, action) => {
  switch (action.type) {
    case usersTypes.AUTH:
      return {
        ...state,
        ...action.payload
      };

    case usersTypes.LOGOUT:
      return state;

    default:
      return state
  }
}
