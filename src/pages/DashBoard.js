import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function DashBoard() {
  const firstName = useSelector(state => state.auth.user.firstName);

  return (
    <div>
      <Typography variant='h3'>Let's get it, {firstName}!</Typography>
    </div>
  );
}

export default DashBoard;
