import { useEffect, useState } from 'react';
import TaskTable from '../components/TaskTable';
import { getTasks } from '../services/tasks-api';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(data => {
      setTasks(data.data);
    });
  }, []);

  return <TaskTable taskData={tasks} />;
}

export default Tasks;
