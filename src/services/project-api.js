import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const getDash = () => {
  return axios.get(`${baseURL}/protected`);
};
