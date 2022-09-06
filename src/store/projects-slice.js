import { createSlice } from '@reduxjs/toolkit';
import * as projectsAPI from '../services/projects-api';

const initialProjectsState = { projects: [] };

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsState,
  reducers: {
    receiveProjects(state, action) {
      state.projects = [...action.payload];
    },
    addToProjects(state, action) {
      state.projects.push(action.payload);
    },
    editProject(state, action) {
      let foundIndex = state.projects.findIndex(
        project => project._id === action.payload._id
      );
      state.projects[foundIndex] = { ...action.payload };
    },
    removeFromProjects(state, action) {
      state.projects = state.projects.filter(
        project => project._id !== action.payload._id
      );
    },
  },
});

export const projectsActions = projectsSlice.actions;

export const fetchProjects = () => {
  return async dispatch => {
    let projects = await projectsAPI.getProjects();
    return dispatch(projectsActions.receiveProjects(projects.data));
  };
};

export default projectsSlice.reducer;
