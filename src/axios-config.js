import axios from 'axios';
import store from './store/auth'

axios.defaults.baseURL = 'https://server-xwi5.onrender.com/';

//add token for each request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//set up a interceptor to handle error
axios.interceptors.response.use(response => {
  return response;
}, error => {
  //handle the error
  if (error.response && error.response.status === 401) {
    //handle auth error
    store.dispatch('logout');
  }
  return Promise.reject(error);
});

export default axios;
