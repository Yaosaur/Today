import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import newTaskSchema from '../schemas/newTask';
import { createTask } from '../services/tasks-api';
import { projectsActions } from '../store/projects-slice';
import { editTask } from '../services/tasks-api';
import { useParams } from 'react-router-dom';

import { Grid, TextField, MenuItem, Button } from '@mui/material';
import MembersSelect from './MembersSelect';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function TaskForm({
  id,
  taskHandler,
  setProject,
  defaultValues,
  editingHandler,
  memberOptions,
}) {
  const dispatch = useDispatch();
  const { projectId, taskId } = useParams();
  const [assignedTo, setAssignment] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  const changeMemberHandler = members => {
    setAssignment(members);
    return setErrMsg(null);
  };

  const onSubmit = values => {
    if (defaultValues) {
      editTask(projectId, taskId, { ...values, assignedTo }).then(data => {
        taskHandler(data.data);
        editingHandler(false);
      });
    } else {
      if (assignedTo.length === 0) {
        setErrMsg('Assign this task to at least one member');
        return;
      } else {
        createTask(id, { ...values, assignedTo }).then(data => {
          setProject(data.data);
          dispatch(projectsActions.editProject(data.data));
          taskHandler(false);
        });
      }
    }
  };

  const initialValues = {
    title: defaultValues ? defaultValues.title : '',
    description: defaultValues ? defaultValues.description : '',
    deadline: defaultValues ? defaultValues.deadline : new Date(),
    priority: defaultValues ? defaultValues.priority : 'Low',
    type: defaultValues ? defaultValues.type : 'New Feature',
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
    initialValues,
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
          memberOptions={memberOptions}
          defaultMembers={defaultValues && defaultValues.assignedTo}
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
        {defaultValues ? (
          <Button variant='contained' type='submit' sx={{ mt: 1.5, mb: 1.5 }}>
            Edit Task
          </Button>
        ) : (
          <Button variant='contained' type='submit' sx={{ mt: 1.5, mb: 1.5 }}>
            Create Task
          </Button>
        )}
      </Grid>
    </form>
  );
}

export default TaskForm;
