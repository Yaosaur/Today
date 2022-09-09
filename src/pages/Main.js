import { Outlet } from 'react-router-dom';
import Navi from '../components/Navi';
import { Grid } from '@mui/material';
import projectbg from '../images/projectbg.jpg';

function Main() {
  return (
    <Grid container height='100vh'>
      <Grid
        item
        md={4}
        lg={2.5}
        style={{
          backgroundColor: 'aliceblue',
        }}
      >
        <Navi />
      </Grid>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${projectbg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        item
        md={8}
        lg={9.5}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Main;
