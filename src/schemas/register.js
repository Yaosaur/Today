import * as yup from 'yup';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required').min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default registerSchema;
