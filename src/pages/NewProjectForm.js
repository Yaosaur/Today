import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import newProjectSchema from '../schemas/newProject';
import { createProject } from '../services/projects-api';
import { projectsActions } from '../store/projects-slice';

import { Stack, Typography, TextField, Button } from '@mui/material';

function NewProjectForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = values => {
    createProject(values).then(result => {
      dispatch(projectsActions.addToProjects(result.data));
      nav(`/projects/${result.data._id}`);
    });
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: '',
        description: '',
        members: [],
      },
      validationSchema: newProjectSchema,
      onSubmit,
    });

  return (
    <div>
      <Typography variant='h4'>New Project</Typography>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2.5}
          width='325px'
          height='400px'
          textAlign='center'
          display='flex'
          justifyContent='center'
        >
          <Typography variant='h6'>Create a New Project</Typography>
          <TextField
            size='small'
            id='outlined-required'
            label='Title'
            placeholder='Title'
            name='title'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            size='small'
            multiline
            id='outlined-description-input'
            label='Description'
            placeholder='Description'
            name='description'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <Button variant='contained' type='submit'>
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default NewProjectForm;
