import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, deleteTask } from '../services/tasks-api';
import { useSelector, useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';
import dateTransformer from '../utils/dateTransformer';

import TaskForm from '../components/TaskForm';
import ModalBox from '../styles/ModalBox';
import Comments from '../components/Comments';
import {
  CircularProgress,
  Grid,
  Typography,
  Tooltip,
  Chip,
  Avatar,
  Fab,
  Zoom,
  Modal,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Task() {
  const currentUserEmail = useSelector(state => state.auth.user.email);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);

  const {
    _id,
    project,
    title,
    description,
    issuer,
    assignedTo,
    dateCreated,
    deadline,
    priority,
    type,
    status,
    comments,
  } = task;

  const projectData = useSelector(state => {
    return state.projects.projects.find(proj => proj._id === project);
  });

  useEffect(() => {
    getTask(taskId)
      .then(data => {
        setTask(data.data);
        setIsLoading(false);
      })
      .catch(error =>
        nav('/non-existent', {
          state: {
            message: `That task doesn't exist`,
            status: 404,
          },
        })
      );
  }, [taskId, nav]);

  const userInvolvedInTask = () => {
    const involvedUsers = [issuer, ...assignedTo];
    if (
      involvedUsers.find(user => user.email === currentUserEmail) !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  let colors = {
    priority: {
      High: 'error',
      Medium: 'secondary',
      Low: 'success',
    },
    status: {
      New: 'error',
      'In Progress': 'secondary',
      Completed: 'success',
    },
    type: {
      Issue: 'error',
      'New Feature': 'secondary',
    },
  };

  const variateColors = label => {
    if (label === 'priority') {
      return colors[label][priority];
    } else if (label === 'status') {
      return colors[label][status];
    } else if (label === 'type') {
      return colors[label][type];
    }
  };

  const deleteTaskHandler = () => {
    deleteTask(project, taskId).then(data => {
      dispatch(projectsActions.editProject(data.data));
      nav(`/projects/${project}`, { replace: true });
    });
  };

  const mainContent = (
    <>
      <Grid
        container
        item
        xs={6}
        justifyContent='space-between'
        rowGap={2}
        sx={{ height: '80%' }}
      >
        <Grid container item xs={5} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Title</Typography>
          <Typography variant='body'>{title}</Typography>
        </Grid>
        <Grid container item xs={5} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Description</Typography>
          <Typography variant='body'>{description}</Typography>
        </Grid>
        <Grid container item xs={5} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Date Created</Typography>
          <Typography variant='body'>{dateTransformer(dateCreated)}</Typography>
        </Grid>
        <Grid container item xs={5} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Deadline</Typography>
          <Typography variant='body'>{dateTransformer(deadline)}</Typography>
        </Grid>
        <Grid container item xs={5} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Priority</Typography>
          <Chip
            color={variateColors('priority')}
            variant='outlined'
            label={priority}
            sx={{ width: 100 }}
          />
        </Grid>
        <Grid container item xs={5} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Status</Typography>
          <Chip
            color={variateColors('status')}
            variant='outlined'
            label={status}
            sx={{ width: 100 }}
          />
        </Grid>
        <Grid container item xs={10} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Type</Typography>
          <Chip
            color={variateColors('type')}
            variant='outlined'
            label={type}
            sx={{ width: 200 }}
          />
        </Grid>
        <Grid container item xs={10} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Issuer</Typography>
          {issuer && (
            <Chip
              avatar={
                <Avatar src={issuer.image}>
                  {issuer.firstName[0]} {issuer.lastName[0]}
                </Avatar>
              }
              label={`${issuer.firstName} ${issuer.lastName}`}
              variant='outlined'
              color='primary'
              sx={{ width: 'fit-content' }}
            />
          )}
        </Grid>
        <Grid container item xs={10} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Assigned to</Typography>
          <Grid item>
            {assignedTo &&
              assignedTo.map((member, index) => (
                <Chip
                  key={index}
                  avatar={
                    <Avatar src={member.image}>
                      {member.firstName[0]} {member.lastName[0]}
                    </Avatar>
                  }
                  label={`${member.firstName} ${member.lastName}`}
                  variant='outlined'
                  color='primary'
                  sx={{ mr: 2 }}
                />
              ))}
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          columnGap={2}
          sx={{ position: 'absolute', bottom: 30 }}
        >
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Tooltip title='Back to Project'>
              <Fab color='success' onClick={() => nav(`/projects/${project}`)}>
                <ArrowBackIcon />
              </Fab>
            </Tooltip>
          </Zoom>
          {assignedTo && userInvolvedInTask() && (
            <Zoom in={true} style={{ transitionDelay: '400ms' }}>
              <Tooltip title='Edit Task'>
                <Fab color='secondary' onClick={() => setOpen(true)}>
                  <EditIcon />
                </Fab>
              </Tooltip>
            </Zoom>
          )}
          {issuer && currentUserEmail === issuer.email && (
            <Zoom in={true} style={{ transitionDelay: '500ms' }}>
              <Tooltip title='Delete Task'>
                <Fab color='error' onClick={deleteTaskHandler}>
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Zoom>
          )}
        </Grid>
      </Grid>
      <Grid container item xs={6} sx={{ height: '80%' }}>
        <Comments taskId={_id} taskComments={comments} />
      </Grid>
    </>
  );

  return (
    <>
      {isLoading ? (
        <Grid
          container
          height='80%'
          width='100%'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress size='7rem' />
        </Grid>
      ) : (
        <Grid container height='80%'>
          {mainContent}
        </Grid>
      )}

      {open && (
        <Modal open={open} onClick={() => setOpen(false)}>
          <ModalBox>
            <TaskForm
              taskHandler={setTask}
              formHandler={setOpen}
              defaultValues={task}
              memberOptions={projectData.members}
            />
          </ModalBox>
        </Modal>
      )}
    </>
  );
}

export default Task;
