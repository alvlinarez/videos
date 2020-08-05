import axios from 'axios';
import { getCookie } from '../utils/auth';

export const axiosClient = () => {
  const token = getCookie('token') || null;
  return axios.create({
    //dev
    baseURL: 'http://localhost:5000/api/',
    //prod
    //baseURL: 'https://alg-videos.herokuapp.com/api/',
    withCredentials: true
  });
};
