import {
  albumsTypes,
} from '@actions';

import {Api} from "../components/Api";

export const loadingAlbums = (data) => dispatch => {
  return Api.loadingAlbums(data)
    .then(res => {
      dispatch({
        type: albumsTypes.LOADED,
        payload: res.data,
        
      });
      return Promise.resolve(res);
    }).catch(error => Promise.reject(error));
};
