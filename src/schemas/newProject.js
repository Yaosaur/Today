import * as yup from 'yup';

const newProjectSchema = yup.object().shape({
  title: yup.string().required('Please add a title for your project'),
  description: yup.string(),
  members: yup.array(),
});

export default newProjectSchema;
