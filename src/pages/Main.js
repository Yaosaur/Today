import Navi from '../components/Navi';
import { Grid } from '@mui/material';

const DashBoard = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Navi />
      </Grid>
      <Grid item xs={9}></Grid>
    </Grid>
  );
};

export default DashBoard;
