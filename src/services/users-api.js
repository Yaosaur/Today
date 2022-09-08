import axios from 'axios';

let baseURL = 'https://today-project-backend.herokuapp.com';

export const findUser = () => {
  return axios.get(`${baseURL}/users`);
};
