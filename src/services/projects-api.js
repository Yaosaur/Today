import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const getProjects = () => {
  return axios.get(`${baseURL}/projects`);
};

export const createProject = data => {
  return axios.post(`${baseURL}/projects`, data);
};

export const findUser = data => {
  return axios.get(`${baseURL}/user`, data);
};
