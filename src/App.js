import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Register from './pages/Register';
import LogIn from './pages/LogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
