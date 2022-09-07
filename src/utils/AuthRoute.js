import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? <Navigate to='/' /> : <Outlet />;
};

export default AuthRoute;
