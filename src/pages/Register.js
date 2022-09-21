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

  const onSubmit = ({ firstName, lastName, email, password }) => {
    dispatch(
      authUser('register', {
        firstName,
        lastName,
        email,
        password,
        image: null,
      })
    ).then(result => nav('/'));
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

  console.log(errors);

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
            height: Object.keys(errors).length !== 0 ? 600 : 500,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={2.5}
              width='325px'
              height='500px'
              textAlign='center'
              display='flex'
              justifyContent='center'
            >
              <Typography variant='h6'>Register</Typography>
              <TextField
                size='small'
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
                size='small'
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
                id='outlined-required'
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
