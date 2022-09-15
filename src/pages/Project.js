import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';
import { getProject } from '../services/projects-api';
import { useFormik } from 'formik';
import newProjectSchema from '../schemas/newProject';
import { editProject } from '../services/projects-api';
import { deleteProject } from '../services/projects-api';

import MemberTable from '../components/MemberTable';
import MembersSelect from '../components/MembersSelect';
import TaskForm from '../components/TaskForm';
import ModalBox from '../styles/ModalBox';
import {
  Grid,
  CircularProgress,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Modal,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import TaskTable from '../components/TaskTable';

function Project() {
  const { projectId } = useParams();
  const currentUserEmail = useSelector(state => state.auth.user.email);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    members: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsEditing({
      title: false,
      description: false,
      members: false,
    });
    getProject(projectId).then(data => {
      setProject(data.data);
      setMembers(data.data.members);
      setIsLoading(false);
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

  const cancelEditingMembersHandler = () => {
    setMembers(project.members);
    editingHandler('members', false);
  };

  const deleteProjectHandler = () => {
    deleteProject(projectId).then(data => {
      dispatch(projectsActions.removeFromProjects(data.data._id));
      nav('/', { replace: true });
    });
  };

  const mainContent = (
    <>
      <Grid container item xs={12} height='350px'>
        <Grid
          container
          item
          xs={7}
          md={6}
          sx={{ height: '30vh', minHeight: '300px' }}
        >
          <Grid container flexDirection='column'>
            <Grid
              container
              item
              lg={6}
              alignContent='flex-start'
              sx={{ height: '30%' }}
            >
              <Typography variant='h4'>Project Title</Typography>
              {project.creator &&
                project.creator.email === currentUserEmail &&
                !isEditing.title && (
                  <>
                    <Tooltip title='Edit Title'>
                      <IconButton onClick={() => editingHandler('title', true)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Project'>
                      <IconButton onClick={deleteProjectHandler}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              {isEditing.title && (
                <Tooltip title='Cancel Editing'>
                  <IconButton
                    onClick={() => {
                      editingHandler('title', false);
                      values.title = project.title;
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item lg={6} sx={{ height: '30%' }}>
              {isEditing.title ? (
                <>
                  <TextField
                    size='small'
                    label='Title'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    sx={{ width: 250 }}
                  />
                  <Tooltip title='Save Changes'>
                    <IconButton onClick={editProjectHandler}>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Typography variant='body'>{project.title}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container flexDirection='column'>
            <Grid
              container
              item
              xs={6}
              alignContent='flex-start'
              sx={{ maxWidth: '100%', height: '30%' }}
            >
              <Typography variant='h4'>Project Description</Typography>
              {project.creator &&
                project.creator.email === currentUserEmail &&
                !isEditing.description && (
                  <Tooltip title='Edit Description'>
                    <IconButton
                      onClick={() => editingHandler('description', true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
              {isEditing.description && (
                <Tooltip title='Cancel Editing'>
                  <IconButton
                    onClick={() => {
                      editingHandler('description', false);
                      values.description = project.description;
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={6}>
              {isEditing.description ? (
                <>
                  <TextField
                    size='small'
                    multiline
                    maxRows={3}
                    label='Description'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{ width: 250 }}
                  />
                  <Tooltip title='Save Changes'>
                    <IconButton onClick={editProjectHandler}>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Typography variant='body'>{project.description}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={5} md={6} rowSpacing={0}>
          <Grid container item xs={12} sx={{ height: '10%' }}>
            <Typography variant='h4'>Members</Typography>
            {project.creator &&
              project.creator.email === currentUserEmail &&
              !isEditing.members && (
                <Tooltip title='Edit Members'>
                  <IconButton onClick={() => editingHandler('members', true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            {isEditing.members && (
              <Tooltip title='Cancel Editing'>
                <IconButton onClick={cancelEditingMembersHandler}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          {isEditing.members ? (
            <Grid container item justifyContent='center' alignItems='center'>
              <MembersSelect
                editMode={true}
                defaultMembers={project.members}
                onChange={changeMemberHandler}
              />
              <Tooltip title='Save Changes'>
                <IconButton size='small' onClick={editProjectHandler}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            <>
              <MemberTable creator={project.creator} members={members} />
            </>
          )}
        </Grid>
      </Grid>
      <Grid container item xs={12} direction='column'>
        <Grid container item xs={3} alignItems='center' justifyContent='center'>
          <Typography variant='h3'>Tasks</Typography>
          <Tooltip title='Add Task'>
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {project.tasks && (
        <TaskTable taskData={project.tasks} project={true} tableRows={5} />
      )}
    </>
  );

  return (
    <Grid
      container
      height='100%'
      width='100%'
      justifyContent='center'
      alignItems='center'
    >
      {isLoading ? (
        <CircularProgress size='7rem' />
      ) : (
        <>
          {mainContent}
          <Modal open={open} onClick={() => setOpen(false)}>
            <ModalBox>
              <TaskForm
                formHandler={setOpen}
                memberOptions={project.members}
                setProject={setProject}
              />
            </ModalBox>
          </Modal>
        </>
      )}
    </Grid>
  );
}

export default Project;
