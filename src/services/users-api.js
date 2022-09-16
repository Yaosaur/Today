import axios from 'axios';

let baseURL = process.env.REACT_APP_BACKEND_URL;

export const findUsers = () => {
  return axios.get(`${baseURL}/users`);
};

export const findUser = () => {
  return axios.get(`${baseURL}/users/user`);
};

export const changeUserPhoto = data => {
  return axios.put(`${baseURL}/users/setPhoto`, data, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
};
