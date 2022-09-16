import axios from 'axios';

let baseURL = 'http://localhost:5000';

export const findUser = () => {
  return axios.get(`${baseURL}/users`);
};

export const changeUserPhoto = data => {
  return axios.put(`${baseURL}/users/setPhoto`, data, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
};
