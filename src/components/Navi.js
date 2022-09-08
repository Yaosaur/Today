import { useSelector, useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';
import { logOut } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import ProjectList from './ProjectList';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Navi() {
  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logOutHandler = () => {
    dispatch(logOut());
    nav('/login');
    dispatch(projectsActions.removeAllProjects());
  };

  return (
    <Box height='100vh' display='flex' flexDirection='column'>
      <Box
        height='200px'
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        alignItems='center'
      >
        <Typography variant='title'>Today</Typography>
        <Avatar sx={{ width: 70, height: 70 }}>
          {firstName[0]} {lastName[0]}
        </Avatar>
        <Typography variant='h5'>{`${firstName} ${lastName}`}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4'>Projects</Typography>
        <Tooltip title='Add Project'>
          <IconButton
            onClick={() => {
              nav('/newproject');
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <ProjectList />
      <Button
        variant='contained'
        onClick={logOutHandler}
        sx={{ alignSelf: 'end', position: 'absolute', bottom: '10px' }}
      >
        Log Out
      </Button>
    </Box>
  );
}

export default Navi;
