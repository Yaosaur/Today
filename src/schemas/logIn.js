import * as yup from 'yup';

const logInSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required').min(6),
});

export default logInSchema;
