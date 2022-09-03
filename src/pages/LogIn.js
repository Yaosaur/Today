import { useFormik } from 'formik';
import logInSchema from '../schemas/logIn';
import { useDispatch } from 'react-redux';
import { authUser } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import { Typography, TextField, Button } from '@mui/material/';

const Auth = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = values => {
    dispatch(authUser('logIn', values));
    nav('/');
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: logInSchema,
      onSubmit,
    });

  return (
    <>
      <Typography variant='h1'>LogIn</Typography>
      <form onSubmit={handleSubmit}>
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

export default Auth;
