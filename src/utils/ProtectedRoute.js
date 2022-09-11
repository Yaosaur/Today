import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navi from '../pages/Navi';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? <Navi /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
