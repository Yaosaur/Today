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
import TaskForm from '../components/TaskForm';
import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import TaskTable from '../components/TaskTable';

function Project() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    members: false,
  });
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    setIsEditing({
      title: false,
      description: false,
      members: false,
    });
    setIsAddingTask(false);
    getProject(projectId).then(data => {
      setProject(data.data);
    });
  }, [projectId]);

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
    editProject(projectId, { ...values, members }).then(data => {
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
    deleteProject(projectId).then(data => {
      dispatch(projectsActions.removeFromProjects(data.data));
      nav('/', { replace: true });
    });
  };

  const toggleTaskFormHandler = () => {
    setIsAddingTask(prevState => !prevState);
  };

  return (
    <Grid container height='100vh'>
      <Grid container item xs={6} alignItems='center' justifyContent='center'>
        {isEditing.title ? (
          <>
            <TextField
              size='small'
              projectId='outlined-required'
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
        <Grid item xs={4}>
          <Button
            variant='contained'
            color='error'
            onClick={deleteProjectHandler}
          >
            Delete Project
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={5} alignItems='center' justifyContent='center'>
        {isEditing.description ? (
          <>
            <TextField
              size='small'
              projectId='outlined-required'
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
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Grid container item xs={3} alignItems='center' justifyContent='center'>
          <Typography variant='h3'>Members</Typography>
          {isEditing.members === false && (
            <Tooltip title='Edit Members'>
              <IconButton onClick={() => editingHandler('members', true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {isEditing.members && (
            <Tooltip title='Cancel Editing'>
              <IconButton onClick={() => editingHandler('members', false)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        {isEditing.members ? (
          <Grid
            container
            item
            xs={8}
            alignItems='center'
            justifyContent='center'
          >
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
          </Grid>
        ) : (
          <>
            <Grid
              container
              item
              xs={6}
              direction='column'
              alignItems='center'
              justifyContent='flex-start'
            >
              {project.members &&
                project.members.map((member, index) => (
                  <p key={index}>
                    {member.firstName} {member.lastName}
                  </p>
                ))}
            </Grid>
          </>
        )}
      </Grid>
      <Grid container item xs={12} direction='column'>
        <Grid container item xs={3} alignItems='center' justifyContent='center'>
          <Typography variant='h3'>Tasks</Typography>
          {isAddingTask === false && (
            <Tooltip title='Add Task'>
              <IconButton onClick={toggleTaskFormHandler}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          {isAddingTask && (
            <Tooltip title='Cancel Adding'>
              <IconButton onClick={toggleTaskFormHandler}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        {isAddingTask && (
          <Grid
            container
            item
            xs={8}
            alignItems='center'
            justifyContent='center'
          >
            <TaskForm
              memberOptions={project.members}
              taskHandler={setIsAddingTask}
              setProject={setProject}
            />
          </Grid>
        )}
      </Grid>
      {project.tasks && (
        <TaskTable
          taskData={project.tasks}
          memberOptions={project.members}
          project={true}
        />
      )}
    </Grid>
  );
}

export default Project;
