import { createSlice } from '@reduxjs/toolkit';
import * as authAPI from '../services/auth-api';
import axios from 'axios';

const initialAuthState = { isLoggedIn: false, user: {} };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    receiveUser(state, action) {
      const { id, firstName, lastName, email } = action.payload;
      state.isLoggedIn = true;
      state.user = { id, firstName, lastName, email };
    },
    removeUser(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const authActions = authSlice.actions;

export const authUser = (type, values) => {
  return async dispatch => {
    let userData;
    if (type === 'register') {
      userData = await authAPI.register(values);
    } else if (type === 'logIn') {
      userData = await authAPI.logIn(values);
    }
    localStorage.setItem('token', userData.data.token);
    axios.defaults.headers.common['Authorization'] = userData.data.token;
    return dispatch(authActions.receiveUser(userData.data));
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  return dispatch => {
    dispatch(authActions.removeUser());
  };
};

export default authSlice.reducer;
