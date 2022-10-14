import axios from 'axios';

const axiosInstance = baseUrl => axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

export default axiosInstance;
