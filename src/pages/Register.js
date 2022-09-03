import { useFormik } from 'formik';
import registerSchema from '../schemas/register';
import { useDispatch } from 'react-redux';
import { authUser } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import { Typography, TextField, Button } from '@mui/material/';

const Register = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = values => {
    dispatch(authUser('register', values));
    nav('/');
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return (
    <>
      <Typography variant='h1'>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id='outlined-required'
          label='First Name'
          placeholder='First Name'
          name='firstName'
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          required
          id='outlined-required'
          label='Last Name'
          placeholder='Last Name'
          name='lastName'
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          required
          id='outlined-required'
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          required
          id='outlined-required'
          label='Password'
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Register;
