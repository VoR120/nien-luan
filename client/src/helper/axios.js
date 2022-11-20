import axios from 'axios';

const token = JSON.parse(window.localStorage.getItem('token'));
console.log(token);

const axiosIntance = axios.create({
  baseURL: 'http://localhost:5000',
});

export default axiosIntance;
