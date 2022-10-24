import { createSlice } from '@reduxjs/toolkit';
import * as authAPI from '../services/auth-api';
import { fetchProjects } from './projects-slice';
import axios from 'axios';

const initialAuthState = { isLoggedIn: false, user: {} };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    receiveUser(state, action) {
      const { id, firstName, lastName, email, image } = action.payload;
      state.isLoggedIn = true;
      state.user = { id, firstName, lastName, email, image };
    },
    editUserImage(state, action) {
      state.user.image = action.payload;
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
    try {
      let userData;
      if (type === 'register') {
        userData = await authAPI.register(values);
      } else if (type === 'logIn') {
        userData = await authAPI.logIn(values);
      }
      localStorage.setItem('token', userData.data.token);
      axios.defaults.headers.common['Authorization'] = userData.data.token;
      dispatch(authActions.receiveUser(userData.data));
      dispatch(fetchProjects());
    } catch (error) {
      throw error;
    }
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
