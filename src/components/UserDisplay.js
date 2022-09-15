import { useSelector } from 'react-redux';

import { Box, Avatar, IconButton, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function UserDisplay() {
  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);

  return (
    <Box display='flex' flexDirection='column' alignItems='center' margin={2}>
      <Avatar
        sx={{ width: '7rem', height: '7rem', mt: 1, mb: 1, fontSize: '2rem' }}
      >
        {firstName[0]} {lastName[0]}
      </Avatar>
      <IconButton
        sx={{
          position: 'absolute',
          top: '170px',
          left: '130px',
          backgroundColor: 'white',
          border: '1px solid rgba(186,186,186,1)',
          '&:hover': { backgroundColor: 'white' },
        }}
      >
        <PhotoCameraIcon />
      </IconButton>
      <Typography variant='h5'>{`${firstName} ${lastName}`}</Typography>
    </Box>
  );
}

export default UserDisplay;