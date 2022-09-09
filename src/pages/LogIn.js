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

  const onSubmit = values => {
    dispatch(authUser('logIn', values)).then(result => {
      nav('/');
    });
  };

  const demoLogInHandler = () => {
    const demoInfo = {
      email: 'demo@mail.com',
      password: 'demo123',
    };
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
              spacing={2.5}
              width='325px'
              height='400px'
              textAlign='center'
              display='flex'
              justifyContent='center'
            >
              <Typography variant='h6'>Log In</Typography>
              <TextField
                size='small'
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
                size='small'
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
