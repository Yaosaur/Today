import { useSelector } from 'react-redux';
import { Box, Avatar, Typography } from '@mui/material';
//S3 account no longer active - Legacy code is no longer being used in project
//Image url location was part of user state, code below was responsible for imports of components from MUI, allowing users to upload and change their profile photo
// import { useSelector, useDispatch } from 'react-redux';
// import { useRef, useState } from 'react';
// import { changeUserPhoto } from '../services/users-api';
// import { authActions } from '../store/auth-slice';
// import { Box, Avatar, Tooltip, IconButton, Typography } from '@mui/material';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import CheckIcon from '@mui/icons-material/Check';
// import ClearIcon from '@mui/icons-material/Clear';

function UserDisplay() {
  const { firstName, lastName } = useSelector(state => state.auth.user);
  //S3 account no longer active - Legacy code is no longer being used in project
  //Code below married React state management with a file uploader to set the state to metadata of the image uploaded
  //const dispatch = useDispatch();
  //const { firstName, lastName, image } = useSelector(state => state.auth.user);
  //const [photo, setPhoto] = useState({ file: null, url: null });
  //const filePickerRef = useRef();

  // const pickImageHandler = () => {
  //   filePickerRef.current.click();
  // };

  // const pickedHandler = event => {
  //   if (event.target.files.length === 1) {
  //     const pickedPhoto = event.target.files[0];
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(pickedPhoto);
  //     fileReader.onload = () => {
  //       setPhoto({ file: pickedPhoto, url: fileReader.result });
  //       event.target.value = null;
  //     };
  //   } else {
  //     return;
  //   }
  // };

  // const submitPhotoHandler = () => {
  //   const formData = new FormData();
  //   formData.append('location', image);
  //   formData.append('image', photo.file);
  //   changeUserPhoto(formData).then(data => {
  //     dispatch(authActions.editUserImage(data.data));
  //     setPhoto({ file: null, url: null });
  //   });
  // };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' margin={2}>
      <Avatar
        //S3 account no longer active - Legacy code is no longer being used in project
        //Code below would display the image after it was uploaded
        // src={photo.url ? photo.url : image}
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
      {//S3 account no longer active - Legacy code is no longer being used in project
      //Icons that displayed check and x icons which allowed the user to save a new avatar image or clear the current on that was staged to be upload to S3
      /* <input
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
      )} */}
      <Typography variant='h5'>{`${firstName} ${lastName}`}</Typography>
    </Box>
  );
}

export default UserDisplay;
