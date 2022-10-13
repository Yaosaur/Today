import { useState } from 'react';
import { useFormik } from 'formik';
import registerSchema from '../schemas/register';
import { useDispatch } from 'react-redux';
import { authUser } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import { Grid, Stack, Typography, TextField, Button } from '@mui/material/';
import FormPaper from '../styles/FormPaper';
import bgImage from '../images/cloudbg.jpg';

function Register() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (
    { firstName, lastName, email, password },
    { resetForm }
  ) => {
    setError(null);
    email = email.toLowerCase();
    setIsLoading(true);
    dispatch(
      authUser('register', {
        firstName,
        lastName,
        email,
        password,
        image: null,
      })
    )
      .then(result => nav('/'))
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data);
        resetForm();
      });
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  if (isLoading) {
    document.getElementById('root').style.cursor = 'wait';
  }

  if (!isLoading) {
    document.getElementById('root').style.cursor = 'default';
  }

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Grid item xs={3}>
        <Typography variant='title' sx={{ color: 'white' }}>
          Today
        </Typography>
        <FormPaper
          elevation={3}
          sx={{
            width: 375,
            height:
              Object.keys(errors).length + Object.keys(touched).length > 8
                ? 600
                : 525,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={2}
              width='325px'
              height='500px'
              textAlign='center'
              display='flex'
              justifyContent='center'
            >
              <Typography variant='subtitle1' color='error'>
                {error}
              </Typography>
              {!isLoading && <Typography variant='h6'>Register</Typography>}
              {isLoading && (
                <Typography variant='h6'>Registering...</Typography>
              )}
              <TextField
                size='small'
                id='firstName'
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
                size='small'
                id='lastName'
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
                size='small'
                id='email'
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
                size='small'
                id='password'
                type='password'
                label='Password'
                placeholder='Password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                size='small'
                id='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  nav('/login');
                }}
              >
                Log In
              </Button>
            </Stack>
          </form>
        </FormPaper>
      </Grid>
    </Grid>
  );
}

export default Register;
