import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';
import { logOut } from './store/auth-slice';

import { authActions } from './store/auth-slice';
import { fetchProjects } from './store/projects-slice';
//S3 account no longer active - Legacy code is no longer being used in project
//Imported the findUser function to find a user from the backend service via email
//import { findUser } from './services/users-api';
import axios from 'axios';
import decode from 'jwt-decode';

document.addEventListener('DOMContentLoaded', async () => {
  if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] = localStorage.token;
    const decodedUser = decode(localStorage.token);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logOut());
    } else {
      store.dispatch(authActions.receiveUser(decodedUser));
      //S3 account no longer active - Legacy code is no longer being used in project
      //Code below helped set up the user's image in the redux store if their credentials were not yet expired upon login
      //const userData = await findUser(decodedUser.email);
      //store.dispatch(authActions.editUserImage(userData.data[0].image));
      store.dispatch(fetchProjects());
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
