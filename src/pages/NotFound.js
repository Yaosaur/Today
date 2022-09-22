import { useLocation } from 'react-router-dom';

import { Typography, Grid, Paper } from '@mui/material';
import notfound from '../images/notfound.gif';

function NotFound() {
  const { state } = useLocation();

  return (
    <Grid container justifyContent='space-evenly' spacing={2}>
      <Grid item xs={12} textAlign='center' margin={2}>
        <Typography variant='title'>
          {state ? state.status : 'This page does not exist'}
        </Typography>
      </Grid>
      <Paper
        elevation={3}
        sx={{ padding: 2, mt: 2, mb: 2, textAlign: 'center' }}
      >
        <Typography variant='h5'>
          {state ? state.message : 'Nothing to see here'}
        </Typography>
        <img
          src={notfound}
          alt='Nothing to see here'
          height='auto'
          width='400px'
          style={{ borderRadius: '5px', margin: '10px' }}
        />
      </Paper>
    </Grid>
  );
}

export default NotFound;
