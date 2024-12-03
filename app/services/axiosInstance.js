import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API's base URL
  timeout: 5000,                      // Optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
