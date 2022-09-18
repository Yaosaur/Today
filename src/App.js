import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import AuthRoute from './utils/AuthRoute';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ProtectedRoute from './utils/ProtectedRoute';
import theme from './styles/theme';
import { Box, CircularProgress } from '@mui/material/';

const DashBoard = React.lazy(() => import('./pages/DashBoard'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Project = React.lazy(() => import('./pages/Project'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const Task = React.lazy(() => import('./pages/Task'));
const Messages = React.lazy(() => import('./pages/Messages'));

const customTheme = createTheme(theme);

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Suspense
          fallback={
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              width='100vw'
              height='100vh'
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='/' element={<DashBoard />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='projects/:projectId' element={<Project />} />
              <Route path='tasks/:taskId' element={<Task />} />
              <Route path='/tasks' element={<Tasks />} />
              {/* Working on sockets */}
              {/* <Route path='/messages/:email' element={<Messages />} /> */}
            </Route>
            <Route path='/' element={<AuthRoute />}>
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
