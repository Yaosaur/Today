import { useDispatch } from 'react-redux';
import { logOut } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

const DashBoard = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logOutHandler = () => {
    dispatch(logOut());
    nav('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant='contained' onClick={logOutHandler}>
        Log Out
      </Button>
    </div>
  );
};

export default DashBoard;
