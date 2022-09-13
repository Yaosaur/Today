import { useEffect, useState } from 'react';
import { getTasks } from '../services/tasks-api';

import { Typography } from '@mui/material';
import TaskTable from '../components/TaskTable';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(data => {
      setTasks(data.data);
    });
  }, []);

  return (
    <>
      <Typography variant='title'>Tasks</Typography>
      <TaskTable taskData={tasks} />
    </>
  );
}

export default Tasks;
