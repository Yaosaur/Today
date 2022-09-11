import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, deleteTask } from '../services/tasks-api';
import { useDispatch } from 'react-redux';
import { projectsActions } from '../store/projects-slice';

import TaskForm from '../components/TaskForm';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Task() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [task, setTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    getTask(taskId).then(data => setTask(data.data));
  }, [taskId]);

  const deleteTaskHandler = () => {
    deleteTask(project._id, taskId).then(data => {
      dispatch(projectsActions.editProject(data.data));
      nav(`/projects/${project._id}`, { replace: true });
    });
  };

  return (
    <div>
      {!isEditing && (
        <>
          <div>{title}</div>
          <div>{description}</div>
          <div>{issuer && issuer.email}</div>
          <div>
            {assignedTo &&
              assignedTo.map((member, index) => (
                <p key={index}>{member.email}</p>
              ))}
          </div>
          <div>{dateCreated}</div>
          <div>{deadline}</div>
          <div>{priority}</div>
          <div>{type}</div>
          <div>{status}</div>
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
          editingHandler={setIsEditing}
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
