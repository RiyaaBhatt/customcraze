// src/axiosInstance.js or similar

import axios from 'axios';

const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  return token;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Update with your Django backend URL
  headers: {
    'X-CSRFToken': getCsrfToken(),
  },
});

export default axiosInstance;