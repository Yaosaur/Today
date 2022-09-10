import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, deleteTask } from '../services/tasks-api';
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from '../store/projects-slice';

import TaskForm from '../components/TaskForm';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Task() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { projectId, taskId } = useParams();
  const project = useSelector(state =>
    state.projects.projects.find(project => project._id === projectId)
  );
  const [task, setTask] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getTask(projectId, taskId).then(data => setTask(data.data));
  }, [projectId, taskId]);

  const deleteTaskHandler = () => {
    deleteTask(projectId, taskId).then(data => {
      dispatch(projectsActions.editProject(data.data));
      nav(`/projects/${projectId}`, { replace: true });
    });
  };

  return (
    <div>
      {!isEditing && (
        <>
          <Tooltip title='Edit Task'>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {isEditing && (
        <TaskForm
          taskHandler={setTask}
          defaultValues={task}
          memberOptions={project.members}
        />
      )}
      <Tooltip title='Delete Task'>
        <IconButton onClick={deleteTaskHandler}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Task;
