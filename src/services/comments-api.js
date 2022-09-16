import axios from 'axios';

let baseURL = 'https://today-project-backend.herokuapp.com';

export const createComment = (taskId, data) => {
  return axios.post(`${baseURL}/comments/${taskId}`, data);
};

export const editComment = (taskId, commentId, data) => {
  return axios.put(`${baseURL}/comments/${taskId}/${commentId}`, data);
};

export const deleteComment = (taskId, commentId) => {
  return axios.delete(`${baseURL}/comments/${taskId}/${commentId}`);
};
