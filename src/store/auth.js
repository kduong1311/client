import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as api from '../helper/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false, // Login or not
    error: null,            // Error message
    success: null,          // Success message
    profile: {},            // User profile
    products: [],           // List of products
    product: {},            // Product detail
    sortOrder: '',          
    role: localStorage.getItem('role') || 'user', // Load role from localStorage
    avatar: localStorage.getItem('avatar') || '',
    searchTerm: '',
    users: []
  },

  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SUCCESS(state, success) {
      state.success = success;
    },
    CLEAR_MESSAGES(state) {
      state.error = null;
      state.success = null;
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term;
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials.username, credentials.password);

        const {user, token} = response;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role)
        localStorage.setItem('avatar', user.avatar)


        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        commit('SET_AUTHENTICATED', true);
        commit('SET_AVATAR', user.avatar)
        commit('SET_ROLE', user.role)
        commit('SET_ERROR', null);
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.message || 'An unknown error occurred';
        commit('SET_ERROR', errorMessage);
      }
    },
    async register({ commit }, formData) {
      try {
        await api.register(formData);
        commit('SET_SUCCESS', 'Registration successful! You can now log in.');
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Registration failed');
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('avatar')
      delete axios.defaults.headers.common['Authorization'];
      commit('SET_AUTHENTICATED', false);
      commit('SET_ROLE', 'user'); // Reset role on logout
    },
    clearMessages({ commit }) {
      commit('CLEAR_MESSAGES');
    },
    async fetchProfile({ commit }) {
      try {
        const response = await axios.get('/api/profile');
        commit('SET_PROFILE', response.data);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch profile');
        throw error;
      }
    },
    async updateProfile({ commit }, formData) {
      try {
        const response = await axios.put('/api/editprofile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        localStorage.removeItem('avatar')
        localStorage.setItem('avatar', response.data.avatar)
        commit('SET_PROFILE', response.data);
        commit('SET_PROFILE', response.data.avatar)
        commit('SET_SUCCESS', 'Profile updated successfully!');
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update profile.');
      }
    },
    async fetchProducts({ commit, state }) {
      try {
        const response = await axios.get('/products', {
          params: {
            sortOrder: state.sortOrder
          }
        });
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch products');
      }
    },

    async fetchUsers ({commit, state}) {
      try {
        const reponse = await axios.get('/api/getAll')
        commit('SET_USERS', reponse.data)
      } catch(error) {
        commit('SET_ERROR', error.message)
      }
    },

    async fetchProductById({ commit }, id) {
      try {
        const response = await axios.get(`/products/${id}`);
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch product');
      }
    },
    async addProduct({ commit }, product) {
      try {
        await axios.post('/products', product, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        commit('SET_SUCCESS', 'Product added successfully!');
        await this.dispatch('fetchProducts');
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to add product.');
      }
    },
    async updateProduct({ commit }, { id, product }) {
      try {
        await axios.put(`/products/${id}`, product, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        commit('SET_SUCCESS', 'Product updated successfully!');
        await this.dispatch('fetchProducts');
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update product.');
      }
    },
    async deleteProduct({ commit }, id) {
      try {
        await axios.delete(`/products/${id}`);
        commit('SET_SUCCESS', 'Product deleted successfully!');
        await this.dispatch('fetchProducts');
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to delete product');
      }
    },
    setSearchTerm({ commit }, term) {
      commit('SET_SEARCH_TERM', term);
    },
    setSortOrder({ commit }, order) {
      commit('SET_SORT_ORDER', order);
      this.dispatch('fetchProducts');
    }
  },
  getters: {
    //Create getter to use the state in store
    isAuthenticated: state => state.isAuthenticated,
    error: state => state.error,
    success: state => state.success,
    profile: state => state.profile,
    products: state => state.products,
    users: state => state.users,
    product: state => state.product,
    searchTerm: state => state.searchTerm,
    role: state => state.role, // Getter for user role
    avatar: state => state.avatar,
    filteredProducts: state => {
      const term = state.searchTerm.toLowerCase();
      return state.products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
  }
});
