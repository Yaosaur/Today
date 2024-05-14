import axios from 'axios';

let baseURL = process.env.REACT_APP_BACKEND_URL;

export const findUsers = () => {
  return axios.get(`${baseURL}/users`);
};

export const findUser = email => {
  return axios.get(`${baseURL}/users/user/${email}`);
};

//S3 account no longer active - Legacy code is no longer being used in project
//Function to callback end service to update user's photo
// export const changeUserPhoto = data => {
//   return axios.put(`${baseURL}/users/setPhoto`, data, {
//     headers: {
//       'Content-Type': 'application/octet-stream',
//     },
//   });
// };
