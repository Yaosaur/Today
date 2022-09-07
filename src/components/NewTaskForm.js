import { useState } from 'react';
import { useFormik } from 'formik';
import newTaskSchema from '../schemas/newTask';

import { TextField, MenuItem, Button } from '@mui/material';
import MembersSelect from './MembersSelect';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function NewTaskForm({ projectMembers }) {
  const [members, setMembers] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const changeMemberHandler = members => {
    setMembers(members);
    if (members.length === 1) {
      setErrMsg('');
    }
  };

  const onSubmit = values => {
    if (members.length === 0) {
      setErrMsg('Assign this task to at least one member');
      return;
    } else {
      console.log({ ...values, members });
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
      type: 'New Feature',
    },
    validationSchema: newTaskSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label='Deadline'
          inputFormat='MM/DD/YYYY'
          minDate={new Date().toISOString().split('T')[0]}
          value={values.deadline}
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
      >
        <MenuItem value={'New Feature'}>New Feature</MenuItem>
        <MenuItem value={'Bug Fix'}>Bug Fix</MenuItem>
      </TextField>
      <Button variant='contained' type='submit'>
        Create Task
      </Button>
    </form>
  );
}

export default NewTaskForm;
