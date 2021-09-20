import axios from 'axios';
import { api } from '../config/urlConfig';

// const token = JSON.parse(window.localStorage.getItem('token'));
// console.log(token);
// 
// const axiosIntance = axios.create({
//   baseURL: api,
//   headers: {
//     'Authorization' : token ? `${token}` : '',
//   },
// });

const getToken = () => {
  const token = JSON.parse(window.localStorage.getItem('a_token'));
  console.log(token);
  return token ? token : "";
}

const axiosIntance = axios.create({
  baseURL: api,
});

export default axiosIntance;
