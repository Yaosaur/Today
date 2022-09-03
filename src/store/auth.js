import { createSlice } from '@reduxjs/toolkit';
import * as authAPI from '../services/auth-api';

const initialAuthState = { isLoggedIn: false, user: {}, token: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    register(state, action) {
      const { id, firstName, lastName, token } = action.payload;
      state.isLoggedIn = true;
      state.user = { id, firstName, lastName };
      state.token = token;
      localStorage.setItem('token', token);
    },
    // logIn(state, action) {
    //   state.isLoggedIn = true;
    //   state.user = { id, firstName, lastName };
    //   state.token = token;
    //   localStorage.setItem('token', token);
    // },
    logOut(state) {
      state.isLoggedIn = false;
      state.user = {};
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const authActions = authSlice.actions;
export const receiveUser = values => {
  return dispatch => {
    authAPI
      .register(values)
      .then(data => dispatch(authActions.register(data.data)));
  };
};
export default authSlice.reducer;
