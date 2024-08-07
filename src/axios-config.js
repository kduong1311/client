import axios from 'axios';

// Đặt URL gốc cho tất cả các yêu cầu HTTP
axios.defaults.baseURL = 'https://server-xwi5.onrender.com/';

// Lấy token từ localStorage và thêm vào tiêu đề Authorization
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
