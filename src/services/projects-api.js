import axios from 'axios';

let baseURL = 'https://today-project-backend.herokuapp.com';

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

export const deleteProject = id => {
  return axios.delete(`${baseURL}/projects/${id}`);
};
