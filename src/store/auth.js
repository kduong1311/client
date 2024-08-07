import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { register, login as apiLogin } from '../helper/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    error: null,
    success: null,
    profile: {}
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
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiLogin(credentials.username, credentials.password);
        const token = response.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        commit('SET_AUTHENTICATED', true);
        commit('SET_ERROR', null);
      } catch (error) {
        // In ra thông tin lỗi để kiểm tra
        console.error('Login error:', error);

        // Kiểm tra và lấy thông báo lỗi từ backend
        const errorMessage = error.message || 'An unknown error occurred';

        // Gửi thông báo lỗi vào Vuex
        commit('SET_ERROR', errorMessage);
      }
    },
    async register({ commit }, formData) {
      try {
        await register(formData);
        commit('SET_SUCCESS', 'Registration successful! You can now log in.');
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Registration failed');
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      commit('SET_AUTHENTICATED', false);
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
        commit('SET_PROFILE', response.data);
        commit('SET_SUCCESS', 'Profile updated successfully!');
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update profile.');
      }
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    error: state => state.error,
    success: state => state.success,
    profile: state => state.profile,
  },
});
