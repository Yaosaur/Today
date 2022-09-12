import * as yup from 'yup';

const newProjectSchema = yup.object().shape({
  title: yup.string().required('Please add a title for your project'),
  description: yup
    .string()
    .required('Please add a description for your project'),
});

export default newProjectSchema;
