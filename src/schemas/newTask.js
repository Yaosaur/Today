import * as yup from 'yup';

const newTaskSchema = yup.object().shape({
  title: yup.string().required('Please add a title for your task'),
  description: yup.string().required('Please add a description for your task'),
  deadline: yup.date(),
  type: yup.string(),
});

export default newTaskSchema;
