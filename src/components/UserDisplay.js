import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { changeUserPhoto } from '../services/users-api';

import { Box, Avatar, Tooltip, IconButton, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function UserDisplay() {
  const { firstName, lastName, image } = useSelector(state => state.auth.user);
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
        event.target.value = null;
      };
    } else {
      return;
    }
  };

  const submitPhotoHandler = () => {
    const formData = new FormData();
    formData.append('image', photo.file);
    changeUserPhoto(formData).then();
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' margin={2}>
      <Avatar
        src={image}
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
      {!photo.file && (
        <IconButton
          size='small'
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
      )}
      {photo.file && (
        <>
          <Tooltip title='Save'>
            <IconButton
              onClick={submitPhotoHandler}
              sx={{
                position: 'absolute',
                top: '175px',
                left: '135px',
                backgroundColor: 'white',
                border: '1px solid rgba(186,186,186,1)',
                height: '2rem',
                width: '2rem',
                '&:hover': { backgroundColor: 'white' },
              }}
            >
              <CheckIcon color='primary' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Clear'>
            <IconButton
              onClick={() => {
                setPhoto({ file: null, url: null });
              }}
              size='small'
              sx={{
                position: 'absolute',
                top: '145px',
                left: '155px',
                backgroundColor: 'white',
                border: '1px solid rgba(186,186,186,1)',
                height: '2rem',
                width: '2rem',
                '&:hover': { backgroundColor: 'white' },
              }}
            >
              <ClearIcon color='error' />
            </IconButton>
          </Tooltip>
        </>
      )}
      <Typography variant='h5'>{`${firstName} ${lastName}`}</Typography>
    </Box>
  );
}

export default UserDisplay;
