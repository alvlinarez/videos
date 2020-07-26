import axios from 'axios';
import { getCookie } from '../utils/auth';

const token = getCookie('token') || null;

export const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});
