import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

import { Box, Avatar, IconButton, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function UserDisplay() {
  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const [photo, setPhoto] = useState({ file: null, url: null });
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = event => {
    if (event.target.files.length === 1) {
      const pickedPhoto = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(pickedPhoto);
      fileReader.onload = () => {
        setPhoto({ file: pickedPhoto, url: fileReader.result });
      };
    } else {
      return;
    }
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' margin={2}>
      <Avatar
        src={photo && photo.url}
        sx={{
          width: '7rem',
          height: '7rem',
          mt: 1,
          mb: 1,
          fontSize: '2rem',
          backgroundColor: '#03A9F4',
        }}
      >
        {firstName[0]} {lastName[0]}
      </Avatar>
      <input
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg, .png, .jpeg'
        onChange={pickedHandler}
      />
      <IconButton
        onClick={pickImageHandler}
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
