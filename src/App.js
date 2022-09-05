import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import AuthRoute from './utils/AuthRoute';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ProtectedRoute from './utils/ProtectedRoute';
import Main from './pages/Main';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/' element={<Main />} />
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
