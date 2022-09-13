import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import newTaskSchema from '../schemas/newTask';
import { createTask } from '../services/tasks-api';
import { projectsActions } from '../store/projects-slice';
import { editTask } from '../services/tasks-api';
import { useParams } from 'react-router-dom';

import {
  Stack,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
} from '@mui/material';
import FormPaper from '../styles/FormPaper';
import MembersSelect from './MembersSelect';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function TaskForm({
  taskHandler,
  setProject,
  defaultValues,
  formHandler,
  memberOptions,
}) {
  const dispatch = useDispatch();
  const { projectId, taskId } = useParams();
  const [assignedTo, setAssignment] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    if (defaultValues) {
      setAssignment(defaultValues.assignedTo);
    }
  }, [defaultValues]);

  const changeMemberHandler = members => {
    setAssignment(members);
    return setErrMsg(null);
  };

  const onSubmit = values => {
    if (defaultValues) {
      editTask(taskId, { ...values, assignedTo }).then(data => {
        taskHandler(data.data);
        formHandler(false);
      });
    } else {
      if (assignedTo.length === 0) {
        setErrMsg('Assign this task to at least one member');
        return;
      } else {
        createTask(projectId, { ...values, assignedTo }).then(data => {
          setProject(data.data);
          dispatch(projectsActions.editProject(data.data));
          formHandler(false);
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
    status: defaultValues ? defaultValues.status : 'New',
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
    <FormPaper elevation={3} onClick={event => event.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2.5}
          width='450px'
          height='400px'
          textAlign='center'
          display='flex'
          justifyContent='center'
        >
          {defaultValues ? (
            <Typography variant='h4'>Edit Task</Typography>
          ) : (
            <Typography variant='h4'>Create a New Task</Typography>
          )}
          <TextField
            size='small'
            id='outlined-title-input'
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label='Deadline'
              size='small'
              inputFormat='MM/DD/YYYY'
              disablePast={true}
              value={values.deadline}
              onChange={value => {
                setFieldValue(
                  'deadline',
                  new Date(Date.parse(value)).toISOString()
                );
              }}
              renderInput={params => <TextField size='small' {...params} />}
            />
          </LocalizationProvider>
          <MembersSelect
            memberOptions={memberOptions}
            defaultMembers={defaultValues && defaultValues.assignedTo}
            onChange={changeMemberHandler}
            errMsg={errMsg}
          />
          <Grid container justifyContent='space-evenly' columnGap={3}>
            <TextField
              id='type'
              select
              size='small'
              label='Type'
              name='type'
              sx={{ flexBasis: '100px', flexGrow: 1 }}
              value={values.type}
              onChange={handleChange}
            >
              <MenuItem value={'New Feature'}>New Feature</MenuItem>
              <MenuItem value={'Issue'}>Issue</MenuItem>
            </TextField>
            <TextField
              id='priority'
              select
              size='small'
              label='Priority'
              name='priority'
              sx={{ flexBasis: '100px', flexGrow: 1 }}
              value={values.priority}
              onChange={handleChange}
            >
              <MenuItem value={'Low'}>Low</MenuItem>
              <MenuItem value={'Medium'}>Medium</MenuItem>
              <MenuItem value={'High'}>High</MenuItem>
            </TextField>
            {defaultValues && (
              <TextField
                id='status'
                size='small'
                select
                label='Status'
                name='status'
                sx={{ flexBasis: '100px', flexGrow: 1 }}
                value={values.status}
                onChange={handleChange}
              >
                <MenuItem value={'New'}>New</MenuItem>
                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </TextField>
            )}
          </Grid>
          {defaultValues ? (
            <Button variant='contained' type='submit' sx={{ mt: 1.5, mb: 1.5 }}>
              Edit Task
            </Button>
          ) : (
            <Button variant='contained' type='submit' sx={{ mt: 1.5, mb: 1.5 }}>
              Create Task
            </Button>
          )}
        </Stack>
      </form>
    </FormPaper>
  );
}

export default TaskForm;
