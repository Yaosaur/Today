import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import newProjectSchema from '../schemas/newProject';
import { createProject } from '../services/projects-api';
import { fetchProjects } from '../store/projects-slice';
import { useState } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';
import MembersSelect from './MembersSelect';

import FormPaper from '../styles/FormPaper';

function NewProjectForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [members, setMembers] = useState([]);

  const onSubmit = values => {
    createProject({ ...values, members }).then(result => {
      dispatch(fetchProjects());
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
    <FormPaper elevation={3} onClick={event => event.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={4}
          width='450px'
          height='400px'
          textAlign='center'
          display='flex'
          justifyContent='center'
        >
          <Typography variant='h4'>Create a New Project</Typography>
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
  );
}

export default NewProjectForm;
