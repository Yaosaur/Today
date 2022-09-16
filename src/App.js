import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import AuthRoute from './utils/AuthRoute';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ProtectedRoute from './utils/ProtectedRoute';
import DashBoard from './pages/DashBoard';
// import Projects from './pages/Projects';
// import Project from './pages/Project';
// import Tasks from './pages/Tasks';
// import Task from './pages/Task';
import theme from './styles/theme';
import { Grid, CircularProgress } from '@mui/material/';

const Projects = React.lazy(() => import('./pages/Projects'));
const Project = React.lazy(() => import('./pages/Project'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const Task = React.lazy(() => import('./pages/Task'));

const customTheme = createTheme(theme);

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Suspense
              fallback={
                <Grid container justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Grid>
              }
            >
              <Route path='/' element={<DashBoard />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='projects/:projectId' element={<Project />} />
              <Route path='tasks/:taskId' element={<Task />} />
              <Route path='/tasks' element={<Tasks />} />
            </Suspense>
          </Route>
          <Route path='/' element={<AuthRoute />}>
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
