import axios from 'axios';

const axiosStorageInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_STORAGE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tạo function để cập nhật store sau khi nó được khởi tạo
let storeInstance = null;
export const setStore = (store) => {
  storeInstance = store;
};

// Request interceptor
axiosStorageInstance.interceptors.request.use(
  (config) => {
    if (storeInstance) {
      const token = storeInstance.getState().auth.token;
      if (token) {
        // Thêm token vào tất cả header types, không chỉ riêng Authorization
        config.headers.Authorization = `Bearer ${token}`;

        // Đảm bảo token được thêm vào common headers
        config.headers.common = {
          ...config.headers.common,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    // Log để debug

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosStorageInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (storeInstance) {
      if (error.response?.status === 401) {
        const { logout } = require('@/store/slices/authSlice');
        storeInstance.dispatch(logout());
      }

      const { showNotification } = require('@/store/slices/uiSlice');
      storeInstance.dispatch(
        showNotification({
          message: error.response?.data?.message || 'An error occurred',
          type: 'error',
        })
      );
    }
    return Promise.reject(error);
  }
);

export default axiosStorageInstance;
