import axios from 'axios';
import { getCookie } from '../utils/auth';

export const axiosClient = () => {
  const token = getCookie('token') || null;
  return axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
};
