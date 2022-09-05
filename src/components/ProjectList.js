import { useState } from 'react';

import { List, ListItemButton, ListItemText } from '@mui/material';

function ProjectList() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List component='ul' aria-label='main mailbox folders'>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={event => handleListItemClick(event, 0)}
      >
        <ListItemText primary='Title 1' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemText primary='Title 2' />
      </ListItemButton>
    </List>
  );
}

export default ProjectList;
