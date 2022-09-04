import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute = () => {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  return isLoggedIn ? <Navigate to='/' /> : <Outlet />;
};

export default AuthRoute;
