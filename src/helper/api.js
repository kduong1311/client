import axios from '../axios-config';

const handleError = fn => async (...params) => {
  try {
    return await fn(...params);
  } catch (error) {
    const message = error.response
      ? `${error.response?.data?.message || error.response.statusText}`
      : 'Network Error or Server not Response';
    
    // Throw the error message to where call this method
    console.error(error)
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


// Lấy tất cả các sản phẩm
const viewAllProducts = handleError(async () => {
  const response = await axios.get('/products');
  return response.data;
});

// Lấy sản phẩm theo ID
const viewProductById = handleError(async (id) => {
  const response = await axios.get(`products/${id}`);
  return response.data;
});

// Thêm một sản phẩm mới
const addNewProduct = handleError(async (formData) => {
  const response = await axios.post('products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

// Cập nhật sản phẩm theo ID
const updateProduct = handleError(async (id, formData) => {
  const response = await axios.put(`products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

// Xóa sản phẩm theo ID
const deleteProductById = handleError(async (id) => {
  const response = await axios.delete(`products/${id}`);
  return response.data;
});

// Xóa tất cả các sản phẩm
const deleteAllProducts = handleError(async () => {
  const response = await axios.delete('products');
  return response.data;
});

const searchProducts = handleError(async (query) => {
  const response = await axios.get(`/products/search?q=${query}`);
  return response.data;
});



export {
  register,
  login,
  viewAllProducts,
  viewProductById,
  addNewProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
  updateProfile,
  searchProducts,
};
