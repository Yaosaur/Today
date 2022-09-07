import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Main from '../pages/Main';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? <Main /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
