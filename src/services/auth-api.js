import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const register = data => {
  return axios.post(`${baseURL}/register`, data);
};
