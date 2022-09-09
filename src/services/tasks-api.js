import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const createTask = (id, data) => {
  return axios.post(`${baseURL}/projects/${id}/tasks`, data);
};
