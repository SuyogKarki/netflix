import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://vast-falls-39829.herokuapp.com/api/',
  // baseURL: 'http://localhost:8800/api/',
});
