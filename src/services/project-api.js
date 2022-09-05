import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const createProject = data => {
  return axios.post(`${baseURL}/project`, data);
};
