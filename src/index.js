import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';
import { logOut } from './store/auth-slice';

import { authActions } from './store/auth-slice';
import axios from 'axios';
import decode from 'jwt-decode';

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] = localStorage.token;
    const decodedUser = decode(localStorage.token);
    const currentTime = Date.now() / 1000;
    console.log(decodedUser.exp);
    console.log(currentTime);
    if (decodedUser.exp < currentTime) {
      store.dispatch(logOut());
    } else {
      store.dispatch(authActions.receiveUser(decodedUser));
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
