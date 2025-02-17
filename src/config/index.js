import axios from 'axios';

export const API_BASE_URL = process.env.CLA_API_BASE_URL || 'https://cla-portal-api.onrender.com';

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