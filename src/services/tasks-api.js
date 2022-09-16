import axios from 'axios';

let baseURL = process.env.REACT_APP_BACKEND_URL;

export const getTasks = () => {
  return axios.get(`${baseURL}/tasks/`);
};

export const getTask = taskId => {
  return axios.get(`${baseURL}/tasks/${taskId}`);
};

export const createTask = (projectId, data) => {
  return axios.post(`${baseURL}/tasks/${projectId}/`, data);
};

export const editTask = (taskId, data) => {
  return axios.put(`${baseURL}/tasks/${taskId}`, data);
};

export const deleteTask = (projectId, taskId) => {
  return axios.delete(`${baseURL}/tasks/${projectId}/${taskId}`);
};
