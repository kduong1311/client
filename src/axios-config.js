import axios from 'axios';
import store from './store/auth'

// Đặt URL gốc cho tất cả các yêu cầu HTTP
axios.defaults.baseURL = 'http://localhost:5000/';

// Thiết lập một interceptor để thêm token vào tiêu đề của mỗi yêu cầu
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Thiết lập một interceptor để xử lý lỗi
axios.interceptors.response.use(response => {
  return response;
}, error => {
  // Xử lý lỗi ở đây (ví dụ: logout nếu token hết hạn)
  if (error.response && error.response.status === 401) {
    // Xử lý lỗi xác thực
    store.dispatch('logout');
  }
  return Promise.reject(error);
});

export default axios;
