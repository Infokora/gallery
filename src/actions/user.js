import {Actions} from 'react-native-router-flux';

import {
  usersTypes,
} from '@actions';
import {Api} from "../components/Api";

export const auth = (id) => dispatch => {
  return Api.auth(id)
    .then(res => {
      dispatch({
        type: usersTypes.AUTH,
        payload: res.data
      });
      return Promise.resolve(res);
    }).catch(error => Promise.reject(error));
};

export const loguot = () => dispatch => {
  dispatch({
    type: usersTypes.LOGOUT,
  });
  Actions.auth();
};
