import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../store/projects-slice';

import ProjectTable from '../components/ProjectTable';
import { Typography, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function DashBoard() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const firstName = useSelector(state => state.auth.user.firstName);
  const projectData = useSelector(state => state.projects.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div>
      <Typography variant='title'>You got this, {firstName}!</Typography>
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
      <ProjectTable projectData={projectData} />
    </div>
  );
}

export default DashBoard;
