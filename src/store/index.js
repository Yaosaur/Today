import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { loggedIn: false, email: null };

createSlice({
  name: 'auth',
  initialAuthState,
  reducers: {
    login() {},
    logout() {},
  },
});
