import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import projectReducer from './project-slice';

const store = configureStore({
  reducer: { auth: authReducer, projects: projectReducer },
});

export default store;
