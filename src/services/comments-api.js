import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const createComment = (taskId, data) => {
  return axios.post(`${baseURL}/comments/${taskId}`, data);
};
