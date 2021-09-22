import axios from 'axios';
import { api } from '../config/urlConfig';

const token = JSON.parse(window.localStorage.getItem('a_token'));
console.log(token);

const axiosIntance = axios.create({
  baseURL: api,
});

export default axiosIntance;
