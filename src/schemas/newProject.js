import * as yup from 'yup';

const newProjectSchema = yup.object().shape({
  title: yup.string().required('Please add a title'),
  description: yup.string().required('Please add a description'),
});

export default newProjectSchema;
