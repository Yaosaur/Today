import axios from 'axios';

let baseURL = process.env.REACT_APP_BACKEND_URL;

export const register = data => {
  return axios.post(`${baseURL}/register`, data);
};

export const logIn = data => {
  return axios.post(`${baseURL}/login`, data);
};
