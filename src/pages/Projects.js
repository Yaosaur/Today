import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../store/projects-slice';

import ProjectTable from '../components/ProjectTable';
import ModalBox from '../styles/ModalBox';
import NewProjectForm from '../components/NewProjectForm';
import { Box, Typography, Tooltip, IconButton, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Projects() {
  const projectData = useSelector(state => state.projects.projects);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <>
      <Box display='flex' alignItems='baseline'>
        <Typography variant='title'>Projects</Typography>
        <Tooltip title='Add Project'>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <ProjectTable projectData={projectData} />
      {open && (
        <Modal open={open} onClick={() => setOpen(false)}>
          <ModalBox>
            <NewProjectForm />
          </ModalBox>
        </Modal>
      )}
    </>
  );
}

export default Projects;
