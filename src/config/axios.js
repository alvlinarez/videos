import axios from 'axios';

export const axiosClient = () => {
  return axios.create({
    baseURL: 'https://alg-videos.herokuapp.com/api/',
    withCredentials: true
  });
};
