import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const findUser = () => {
  return axios.get(`${baseURL}/users`);
};
