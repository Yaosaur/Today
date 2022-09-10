import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const getTask = (projectId, taskId) => {
  return axios.get(`${baseURL}/projects/${projectId}/tasks/${taskId}`);
};

export const createTask = (id, data) => {
  return axios.post(`${baseURL}/projects/${id}/tasks`, data);
};

export const editTask = (projectId, taskId, data) => {
  return axios.put(`${baseURL}/projects/${projectId}/tasks/${taskId}`, data);
};

export const deleteTask = (id, taskId) => {
  return axios.delete(`${baseURL}/projects/${id}/tasks/${taskId}`);
};
