import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const getProjects = () => {
  return axios.get(`${baseURL}/projects`);
};

export const getProject = id => {
  return axios.get(`${baseURL}/projects/${id}`);
};

export const createProject = data => {
  return axios.post(`${baseURL}/projects`, data);
};

export const editProject = (id, data) => {
  return axios.put(`${baseURL}/projects/${id}`, data);
};

export const findUser = data => {
  return axios.get(`${baseURL}/user`, data);
};
