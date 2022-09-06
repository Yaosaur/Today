import { useState } from 'react';
import { useSelector } from 'react-redux';

import { List, ListItemButton, ListItemText } from '@mui/material';

function ProjectList() {
  const projects = useSelector(state => state.projects.projects);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List component='ul' aria-label='main mailbox folders'>
      {projects.map((project, index) => {
        return (
          <ListItemButton
            key={project._id}
            selected={selectedIndex === index}
            onClick={event => handleListItemClick(event, index)}
          >
            <ListItemText primary={project.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default ProjectList;
