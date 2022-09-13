import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, deleteTask } from '../services/tasks-api';
import { useSelector, useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';
import dateTransformer from '../utils/dateTransformer';

import TaskForm from '../components/TaskForm';
import ModalBox from '../styles/ModalBox';
import {
  CircularProgress,
  Grid,
  Typography,
  Tooltip,
  Chip,
  Fab,
  Zoom,
  Modal,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Task() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);

  const {
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
  } = task;

  const projectData = useSelector(state => {
    return state.projects.projects.find(proj => proj._id === project);
  });

  useEffect(() => {
    getTask(taskId).then(data => {
      setTask(data.data);
      setIsLoading(false);
    });
  }, [taskId]);

  const deleteTaskHandler = () => {
    deleteTask(project, taskId).then(data => {
      dispatch(projectsActions.editProject(data.data));
      nav(`/projects/${project}`, { replace: true });
    });
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

  const mainContent = (
    <>
      <Grid container item xs={6} justifyContent='space-between' rowGap={2}>
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
          <Typography variant='body'>
            {issuer && issuer.firstName} {issuer && issuer.lastName}
          </Typography>
        </Grid>
        <Grid container item xs={10} flexDirection='column' rowGap={1}>
          <Typography variant='h4'>Assigned to</Typography>
          <Grid item>
            {assignedTo &&
              assignedTo.map((member, index) => (
                <Typography variant='body' key={index} sx={{ paddingRight: 1 }}>
                  {member.firstName} {member.lastName}
                  {index !== assignedTo.length - 1 && ','}
                </Typography>
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
          <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <Tooltip title='Edit Task'>
              <Fab color='secondary' onClick={() => setOpen(true)}>
                <EditIcon />
              </Fab>
            </Tooltip>
          </Zoom>
          <Zoom in={true} style={{ transitionDelay: '500ms' }}>
            <Tooltip title='Delete Task'>
              <Fab color='error' onClick={deleteTaskHandler}>
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </Zoom>
        </Grid>
      </Grid>
      <Grid container item xs={5}></Grid>
    </>
  );

  return (
    <>
      {isLoading ? (
        <Grid
          container
          height='100%'
          width='100%'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress size='7rem' />
        </Grid>
      ) : (
        <>{mainContent}</>
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
