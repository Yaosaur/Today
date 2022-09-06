import { Outlet } from 'react-router-dom';
import Navi from '../components/Navi';
import { Grid } from '@mui/material';

const Main = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Navi />
      </Grid>
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Main;
