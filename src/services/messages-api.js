import axios from 'axios';

let baseURL = process.env.REACT_APP_BACKEND_URL;

export const getMessages = email => {
  return axios.get(`${baseURL}/messages/${email}`);
};
