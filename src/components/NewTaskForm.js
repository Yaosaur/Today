import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import newTaskSchema from '../schemas/newTask';
import { createTask } from '../services/tasks-api';
import { projectsActions } from '../store/projects-slice';

import { Grid, TextField, MenuItem, Button } from '@mui/material';
import MembersSelect from './MembersSelect';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function NewTaskForm({ id, projectMembers, addTaskHandler, setProject }) {
  const dispatch = useDispatch();
  const [assignedTo, setAssignment] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const changeMemberHandler = members => {
    setAssignment(members);
    if (assignedTo.length === 1) {
      setErrMsg('');
    }
  };

  const onSubmit = values => {
    if (assignedTo.length === 0) {
      setErrMsg('Assign this task to at least one member');
      return;
    } else {
      createTask(id, { ...values, assignedTo }).then(data => {
        setProject(data.data);
        dispatch(projectsActions.editProject(data.data));
        addTaskHandler(false);
      });
    }
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: new Date(),
      priority: 'Low',
      type: 'New Feature',
    },
    validationSchema: newTaskSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent='center'>
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
          sx={{ ml: 1.5, mr: 1.5 }}
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
          sx={{ ml: 1.5, mr: 1.5 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label='Deadline'
            inputFormat='MM/DD/YYYY'
            minDate={new Date().toISOString().split('T')[0]}
            value={values.deadline}
            sx={{ ml: 1.5, mr: 1.5 }}
            onChange={value => {
              setFieldValue(
                'deadline',
                new Date(Date.parse(value)).toISOString()
              );
            }}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        <MembersSelect
          memberOptions={projectMembers}
          onChange={changeMemberHandler}
          errMsg={errMsg}
        />
        <TextField
          id='type'
          select
          label='Type'
          name='type'
          value={values.type}
          onChange={handleChange}
          sx={{ ml: 1.5, mr: 1.5 }}
        >
          <MenuItem value={'New Feature'}>New Feature</MenuItem>
          <MenuItem value={'Bug Fix'}>Bug Fix</MenuItem>
        </TextField>
        <TextField
          id='priority'
          select
          label='Priority'
          name='priority'
          value={values.priority}
          onChange={handleChange}
          sx={{ ml: 1.5, mr: 1.5 }}
        >
          <MenuItem value={'Low'}>Low</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'High'}>High</MenuItem>
        </TextField>
        <Button variant='contained' type='submit' sx={{ mt: 1.5, mb: 1.5 }}>
          Create Task
        </Button>
      </Grid>
    </form>
  );
}

export default NewTaskForm;
