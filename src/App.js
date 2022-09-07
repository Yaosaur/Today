import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import AuthRoute from './utils/AuthRoute';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ProtectedRoute from './utils/ProtectedRoute';
import DashBoard from './pages/DashBoard';
import NewProjectForm from './pages/NewProjectForm';
import Project from './pages/Project';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/' element={<DashBoard />} />
            <Route path='newproject' element={<NewProjectForm />} />
            <Route path='projects/:id' element={<Project />} />
          </Route>
          <Route path='/' element={<AuthRoute />}>
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
