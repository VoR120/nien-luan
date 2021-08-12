import axios from 'axios';
import { api } from '../config/urlConfig';

const token = JSON.parse(window.localStorage.getItem('token'));
console.log(token);

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    'Authorization' : token ? `${token}` : '',
  },
});

export default axiosIntance;
