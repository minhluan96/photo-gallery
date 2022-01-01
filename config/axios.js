import axios from 'axios';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.API_URL;
axiosInstance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.defaults.headers['Content-Type'] = 'application/json';

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status !== 200 && response.status !== 201)
      return Promise.reject(response);
    return response.data;
  },
  (error) => {
    if (error) return Promise.reject(error.response);
    return Promise.reject();
  }
);

export default axiosInstance;
