import axios from 'axios';
import {
  AsyncStorage
} from 'react-native';

export const host = 'https://jsonplaceholder.typicode.com';

const api = {
  // USER
  users: '/users',
  albums: '/albums',
  photos: '/photos',
};

const http = axios.create({
  baseURL: host,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
});

class ApiCreate {
  auth(id) {
    return http.get(api.users + '/' + id)
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error));
  }

  loadingAlbums(data) {
    return http.get(api.albums, data)
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error));
  }

  loadingPhotos(data) {
    return this.getLocalPhotos(data)
      .then(local => {
        return http.get(api.photos + '?albumId=' + data)
          .then(res => {
            if (local !== null) res.data.push(local);
            return Promise.resolve(res)
          }).catch(error => Promise.reject(error));
      })
  }

  getLocalPhotos(data) {
    return AsyncStorage.getItem(data.toString())
      .then(res => Promise.resolve(res));
  }

  saveLocalPhotos(data) {
    return AsyncStorage.setItem(data.id.toString(), data.url.toString())
      .then(res => Promise.resolve(res));
  }
}

export const Api = new ApiCreate();
