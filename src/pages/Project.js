import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/projects-api';

import { Typography } from '@mui/material';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    getProject(id).then(data => setProject(data.data));
  }, [id]);

  return (
    <div>
      <Typography variant='h3'>{project.title}</Typography>
      <Typography variant='h5'>{project.description}</Typography>
    </div>
  );
}

export default Project;
