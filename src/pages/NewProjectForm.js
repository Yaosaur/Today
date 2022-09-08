import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import newProjectSchema from '../schemas/newProject';
import { createProject } from '../services/projects-api';
import { projectsActions } from '../store/projects-slice';
import { useState } from 'react';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import MembersSelect from '../components/MembersSelect';

import FormPaper from '../styles/FormPaper';

function NewProjectForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [members, setMembers] = useState([]);

  const onSubmit = values => {
    createProject({ ...values, members }).then(result => {
      dispatch(projectsActions.addToProjects(result.data));
      nav(`/projects/${result.data._id}`);
    });
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: '',
        description: '',
      },
      validationSchema: newProjectSchema,
      onSubmit,
    });

  const changeMemberHandler = members => {
    setMembers(members);
  };

  return (
    <Box
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <FormPaper sx={{ width: 400, height: 500 }}>
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
            <MembersSelect onChange={changeMemberHandler} />
            <Button variant='contained' type='submit'>
              Create
            </Button>
          </Stack>
        </form>
      </FormPaper>
    </Box>
  );
}

export default NewProjectForm;
