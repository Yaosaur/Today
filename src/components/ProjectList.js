import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../store/projects-slice';

import {
  Stack,
  Skeleton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';

function ProjectList() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const projects = useSelector(state => state.projects.projects);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchProjects()).then(setIsLoading(false));
  }, [dispatch]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    nav(`/projects/${projects[index]._id}`);
  };

  return (
    <List component='ul' aria-label='main mailbox folders'>
      {isLoading ? (
        <Stack spacing={-3}>
          <Skeleton variant='text' sx={{ fontSize: '4rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '4rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '4rem' }} />
        </Stack>
      ) : (
        projects.map((project, index) => {
          return (
            <ListItemButton
              key={project._id}
              selected={selectedIndex === index}
              onClick={event => handleListItemClick(event, index)}
            >
              <ListItemText primary={project.title} />
            </ListItemButton>
          );
        })
      )}
    </List>
  );
}

export default ProjectList;
