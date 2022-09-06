import { useEffect, useState } from 'react';
import { getProjects } from '../services/projects-api';
import Navi from '../components/Navi';
import DashBoard from '../components/DashBoard';
import { Grid } from '@mui/material';

const Main = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Navi />
      </Grid>
      <Grid item xs={9}>
        <DashBoard />
      </Grid>
    </Grid>
  );
};

export default Main;
