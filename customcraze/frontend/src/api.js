import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Your Django API URL
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
