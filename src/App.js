import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import theme from './styles/theme';
import AuthRoute from './utils/AuthRoute';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ProtectedRoute from './utils/ProtectedRoute';
import DashBoard from './pages/DashBoard';
import NewProjectForm from './pages/NewProjectForm';
import Project from './pages/Project';
import Tasks from './pages/Tasks';
import Task from './pages/Task';

const customTheme = createTheme(theme);

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/' element={<DashBoard />} />
            <Route path='newproject' element={<NewProjectForm />} />
            <Route path='projects/:projectId' element={<Project />} />
            <Route path='tasks/:taskId' element={<Task />} />
            <Route path='/tasks' element={<Tasks />} />
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
