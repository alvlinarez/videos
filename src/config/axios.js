import axios from 'axios';

export const axiosClient = () => {
  return axios.create({
    //baseURL: 'http://localhost:5000/api/',
    baseURL: '/api/',
    withCredentials: true
  });
};
