import qs from 'qs';
import axios from 'axios';

const APP_KEY = 'bp3alvlj2sgs1rf';
const ROOT_URL = 'https://www.dropbox.com';
const API_ROOT_URL = 'https://api.dropboxapi.com';
const CONTENT_ROOT_URL = 'https://content.dropboxapi.com';
const REDIRECT_URI = 'http://localhost:8081/oauth2/callback';

export default {
  login() {
    const queryString = {
      client_id: APP_KEY,
      response_type: 'token',
      redirect_uri: REDIRECT_URI
    };
    window.location =  `${ROOT_URL}/oauth2/authorize?${qs.stringify(queryString)}`;
  },
  fetchImages(token) {
    const data = {"include_deleted":false,"include_has_explicit_shared_members":false,"include_media_info":false,"include_mounted_folders":true,"include_non_downloadable_files":true,"path":"/test_app","recursive":false};
    
    const response = axios.post(`${API_ROOT_URL}/2/files/list_folder`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  },
  fetchImageLink(token, imageLink) {
    const data = {"path": imageLink};
    
    const response = axios.post(`${API_ROOT_URL}/2/files/get_temporary_link`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  },
  uploadImages(images, token) {
    const promises = Array.from(images).map(image => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function() {
          try {
            const response = axios.post(`${CONTENT_ROOT_URL}/2/files/upload`, reader.result, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Dropbox-API-Arg': `{"autorename":false,"mode":"add","mute":false,"path":"/test_app/${image.name}","strict_conflict":false}`,
                'Content-Type': "application/octet-stream"
              }
            });
            resolve(response);
          } catch (err) {
            reject(err);
          }
        };
        reader.readAsArrayBuffer(image);
      });
    });

    return Promise.all(promises);
  }
}