import axios from 'axios';

// ✅ Use `process.env.REACT_APP_API_BASE_URL`
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log('🚀 API Base URL:', API_BASE_URL); // Debugging

// Create axios instance with default config
export const createAxiosInstance = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};
