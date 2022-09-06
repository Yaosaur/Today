import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/projects-api';
import { useFormik } from 'formik';
import newProjectSchema from '../schemas/newProject';
import { editProject } from '../services/projects-api';

import { Typography, Tooltip, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
  });

  useEffect(() => {
    getProject(id).then(data => setProject(data.data));
  }, [id]);

  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: project.title,
      description: project.description,
    },
    validationSchema: newProjectSchema,
  });

  const isEditingHandler = type => {
    if (type === 'title') {
      setIsEditing({ title: true, description: false });
    } else if (type === 'description') {
      setIsEditing({ title: false, description: true });
    }
  };

  const notEditingHandler = () => {
    setIsEditing({ title: false, description: false });
  };

  const editProjectHandler = () => {
    editProject(id, values).then(data => {
      setProject(data.data);
      notEditingHandler();
    });
  };

  return (
    <div>
      {isEditing.title ? (
        <>
          <TextField
            size='small'
            id='outlined-required'
            label='Title'
            name='title'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <Tooltip title='Save Changes'>
            <IconButton onClick={editProjectHandler}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Cancel Editing'>
            <IconButton onClick={notEditingHandler}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography variant='h3'>{project.title}</Typography>
          <Tooltip title='Edit Title'>
            <IconButton onClick={() => isEditingHandler('title')}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      {isEditing.description ? (
        <>
          <TextField
            size='small'
            id='outlined-required'
            label='Description'
            name='description'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <Tooltip title='Save Changes'>
            <IconButton onClick={editProjectHandler}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Cancel Editing'>
            <IconButton onClick={notEditingHandler}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography variant='h5'>{project.description}</Typography>
          <Tooltip title='Edit Description'>
            <IconButton onClick={() => isEditingHandler('description')}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
}

export default Project;
