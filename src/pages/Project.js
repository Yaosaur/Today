import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';
import { getProject } from '../services/projects-api';
import { useFormik } from 'formik';
import newProjectSchema from '../schemas/newProject';
import { editProject } from '../services/projects-api';
import { deleteProject } from '../services/projects-api';

import MembersSelect from '../components/MembersSelect';
import {
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function Project() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    members: false,
  });

  useEffect(() => {
    getProject(id).then(data => {
      console.log(data.data);
      setProject(data.data);
    });
  }, [id]);

  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: project.title,
      description: project.description,
    },
    validationSchema: newProjectSchema,
  });

  const editingHandler = (type, state) => {
    if (type === 'title') {
      setIsEditing(prevState => ({ ...prevState, title: state }));
    } else if (type === 'description') {
      setIsEditing(prevState => ({ ...prevState, description: state }));
    } else if (type === 'members') {
      setIsEditing(prevState => ({ ...prevState, members: state }));
    }
  };

  const changeMemberHandler = members => {
    setMembers(members);
  };

  const editProjectHandler = () => {
    editProject(id, { ...values, members }).then(data => {
      dispatch(projectsActions.editProject(data.data));
      setProject(data.data);
      setIsEditing({
        title: false,
        description: false,
        members: false,
      });
    });
  };

  const deleteProjectHandler = () => {
    deleteProject(id).then(data => {
      dispatch(projectsActions.removeFromProjects(data.data));
      nav('/', { replace: true });
    });
  };

  return (
    <>
      <Button variant='contained' color='error' onClick={deleteProjectHandler}>
        Delete Project
      </Button>
      {isEditing.title ? (
        <>
          <TextField
            size='small'
            id='outlined-required'
            label='Title'
            name='title'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <Tooltip title='Save Changes'>
            <IconButton onClick={editProjectHandler}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Cancel Editing'>
            <IconButton onClick={() => editingHandler('title', false)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography variant='h3'>{project.title}</Typography>
          <Tooltip title='Edit Title'>
            <IconButton onClick={() => editingHandler('title', true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Typography variant='h3'>Description</Typography>
      {isEditing.description ? (
        <>
          <TextField
            size='small'
            id='outlined-required'
            label='Description'
            name='description'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <Tooltip title='Save Changes'>
            <IconButton onClick={editProjectHandler}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Cancel Editing'>
            <IconButton onClick={() => editingHandler('description', false)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography variant='h5'>{project.description}</Typography>
          <Tooltip title='Edit Description'>
            <IconButton onClick={() => editingHandler('description', true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Typography variant='h3'>Members</Typography>
      {isEditing.members ? (
        <>
          <MembersSelect
            editMode={true}
            defaultMembers={project.members}
            onChange={changeMemberHandler}
          />
          <Tooltip title='Save Changes'>
            <IconButton onClick={editProjectHandler}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Cancel Editing'>
            <IconButton onClick={() => editingHandler('members', false)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          {project.members &&
            project.members.map((member, index) => (
              <p key={index}>
                {member.firstName} {member.lastName}
              </p>
            ))}
          <Tooltip title='Edit Members'>
            <IconButton onClick={() => editingHandler('members', true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
}

export default Project;
