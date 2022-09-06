import { createSlice } from '@reduxjs/toolkit';
import * as projectsAPI from '../services/projects-api';

const initialProjectsState = { projects: [] };

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsState,
  reducers: {
    receiveProjects(state, projects) {
      state.projects = [...projects.payload];
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
