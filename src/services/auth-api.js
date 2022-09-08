import axios from 'axios';

let baseURL = 'https://today-project-backend.herokuapp.com';

export const register = data => {
  return axios.post(`${baseURL}/register`, data);
};

export const logIn = data => {
  return axios.post(`${baseURL}/login`, data);
};
