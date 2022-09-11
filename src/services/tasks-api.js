import axios from 'axios';

let baseURL = 'http://localhost:5000';

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
