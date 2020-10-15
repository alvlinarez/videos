import axios from 'axios';

export const axiosClient = () => {
  return axios.create({
    //baseURL: 'http://localhost:5000/api/',
    baseURL: 'https://videos.alvlinarez.dev/videos-server/api/',
    withCredentials: true
  });
};
