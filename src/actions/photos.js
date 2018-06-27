import {
  photosTypes,
} from '@actions';
import ImagePicker from "react-native-image-picker";

import {Api} from "../components/Api";

export const loadingPhotos = (data) => dispatch => {
  return Api.loadingPhotos(data)
    .then(res => {
      dispatch({
        type: photosTypes.LOADED,
        payload: res.data,
        album: data
      });
      return Promise.resolve(res);
    }).catch(error => Promise.reject(error));
};

export const showImagePicker = () =>
  new Promise((resolve, reject) =>
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) reject('image_picker_cancelled');
      else if (response.error) reject(response.error);
      else resolve(response);
    })
  );


export const addNewPhoto = (data) => dispatch => {
  return showImagePicker()
    .then(photo => {
      return Api.saveLocalPhotos({...data, uri: photo})
        .then(res => {
          dispatch({
            type: photosTypes.SAVE,
            payload: photo.uri,
            album: data.id
          });
          return Promise.resolve(res);
        }).catch(error => Promise.reject(error));
    }).catch(error => Promise.reject(error))

};
