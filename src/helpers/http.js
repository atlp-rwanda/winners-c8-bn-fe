import axios from 'axios';
import { errorToast } from './generateToast';
const axiosInstance = axios.create({
  baseURL: process.env.BASE_BACKEND_SERVER_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  config.headers.Authorization = token && `Bearer ${token}`;
  return config;
});
const loginRequiredMessages = [
  'Access denied. No token provided!',
  'Access denied. User not found',
  'Access denied. Invalid session!',
  'Access denied. Invalid token',
];
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.code) {
      case 'ERR_BAD_REQUEST':
        errorToast(
          error?.response?.data?.message || error?.response?.data?.error
        );
        if (
          error?.response?.status == 401 &&
          loginRequiredMessages.includes(error?.response?.data?.message)
        )
          window.location.href = '/login';
      default:
        return error.response.data;
    }
  }
);
export default axiosInstance;
