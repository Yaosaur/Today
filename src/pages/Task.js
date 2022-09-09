import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, deleteTask } from '../services/tasks-api';
import { useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';

import { Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Task() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { projectId, taskId } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    getTask(projectId, taskId).then(data => setTask(data.data));
  });

  const deleteTaskHandler = () => {
    deleteTask(projectId, taskId).then(data => {
      dispatch(projectsActions.editProject(data.data));
      nav(`/projects/${projectId}`, { replace: true });
    });
  };

  return (
    <div>
      {task && task.title}
      <Tooltip title='Delete Task'>
        <IconButton onClick={deleteTaskHandler}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Task;
