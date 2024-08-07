import axios from '../axios-config';

const handleError = fn => async (...params) => {
  try {
    return await fn(...params);
  } catch (error) {
    const message = error.response
      ? `${error.response?.data?.message || error.response.statusText}`
      : 'Lỗi mạng hoặc máy chủ không phản hồi';
    
    // Truyền thông báo lỗi ra ngoài để xử lý ở nơi gọi
    throw { message };
  }
};

// Đăng ký người dùng mới
const register = handleError(async (formData) => {
  const response = await axios.post('api/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

// Đăng nhập người dùng
const login = handleError(async (username, password) => {
  const response = await axios.post('api/login', { username, password });
  return response.data;
});


// Cập nhật profile người dùng
const updateProfile = handleError(async (formData) => {
  const response = await axios.put('/api/editprofile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

// Lấy tất cả các từ điển
const ViewAllVocabs = handleError(async () => {
  const response = await axios.get('/vocabs');
  return response.data;
});

// Lấy từ điển theo ID
const ViewVocabById = handleError(async (id) => {
  const response = await axios.get(`vocabs/${id}`);
  return response.data;
});

// Thêm một từ điển mới
const AddNewVocab = handleError(async (vocab) => {
  const response = await axios.post('vocabs', vocab);
  return response.data;
});

// Xóa tất cả các từ điển
const DeleteAllVocab = handleError(async () => {
  const response = await axios.delete('vocabs');
  return response.data;
});

// Cập nhật thông tin một từ điển theo ID
const UpdateVocab = handleError(async (id, vocab) => {
  const response = await axios.put(`vocabs/${id}`, vocab);
  return response.data;
});

// Xóa một từ điển theo ID
const DeleteAVocab = handleError(async (id) => {
  const response = await axios.delete(`vocabs/${id}`);
  return response.data;
});

export {
  register,
  login,
  ViewAllVocabs,
  ViewVocabById,
  AddNewVocab,
  UpdateVocab,
  DeleteAVocab,
  DeleteAllVocab,
  updateProfile
};
