import axios from 'axios';

let baseURL = 'https://today-project-backend.herokuapp.com';

export const createTask = (id, data) => {
  return axios.post(`${baseURL}/projects/${id}/task`, data);
};
