import { useState } from 'react';
import { useFormik } from 'formik';
import logInSchema from '../schemas/logIn';
import { useDispatch } from 'react-redux';
import { authUser } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import { Grid, Stack, Typography, TextField, Button } from '@mui/material/';
import FormPaper from '../styles/FormPaper';
import bgImage from '../images/cloudbg.jpg';

function LogIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values, { resetForm }) => {
    setError(null);
    let { email } = values;
    email = email.trim().toLowerCase();
    setIsLoading(true);
    dispatch(authUser('logIn', { ...values, email }))
      .then(result => {
        setIsLoading(false);
        nav('/');
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data);
        resetForm();
      });
  };

  const demoLogInHandler = () => {
    const demoInfo = {
      email: 'demo@mail.com',
      password: 'demo123',
    };
    setIsLoading(true);
    dispatch(authUser('logIn', demoInfo)).then(result => {
      nav('/');
    });
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
        <FormPaper elevation={3} sx={{ width: 375, height: 400 }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={2}
              width='325px'
              height='400px'
              textAlign='center'
              display='flex'
              justifyContent='center'
            >
              <Typography variant='subtitle1' color='error'>
                {error}
              </Typography>
              {!isLoading && <Typography variant='h6'>Log In</Typography>}
              {isLoading && <Typography variant='h6'>Logging In...</Typography>}
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
              <Button variant='contained' type='submit'>
                Log In
              </Button>
              <Button variant='contained' onClick={demoLogInHandler}>
                Demo Log In
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  nav('/register');
                }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </FormPaper>
      </Grid>
    </Grid>
  );
}

export default LogIn;
