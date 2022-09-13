import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTasks } from '../services/tasks-api';

import PieChart, {
  Size,
  Series,
  Label,
  Legend,
} from 'devextreme-react/pie-chart';
import { CircularProgress, Typography, Grid, Paper } from '@mui/material';
import nodatamorning from '../images/nodatamorning.gif';

function DashBoard() {
  const firstName = useSelector(state => state.auth.user.firstName);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(data => {
      setTasks(data.data);
      setIsLoading(false);
    });
  }, []);

  const filteredPriorityLength = filter => {
    return tasks.filter(task => task.priority === filter).length;
  };

  const filteredStatusLength = filter => {
    return tasks.filter(task => task.status === filter).length;
  };

  const filteredTypeLength = filter => {
    return tasks.filter(task => task.type === filter).length;
  };

  const priorityRatio = [
    {
      name: 'High',
      area: filteredPriorityLength('High') / tasks.length,
    },
    {
      name: 'Medium',
      area: filteredPriorityLength('Medium') / tasks.length,
    },
    {
      name: 'Low',
      area: filteredPriorityLength('Low') / tasks.length,
    },
  ];

  const statusRatio = [
    {
      name: 'New',
      area: filteredStatusLength('New') / tasks.length,
    },
    {
      name: 'In Progress',
      area: filteredStatusLength('In Progress') / tasks.length,
    },
    {
      name: 'Complete',
      area: filteredStatusLength('Complete') / tasks.length,
    },
  ];

  const typeRatio = [
    {
      name: 'Issue',
      area: filteredTypeLength('Issue') / tasks.length,
    },
    {
      name: 'New Feature',
      area: filteredTypeLength('New Feature') / tasks.length,
    },
  ];

  const pieCharts = [
    {
      title: 'Tasks by Priority',
      dataSource: priorityRatio,
    },
    {
      title: 'Tasks by Status',
      dataSource: statusRatio,
    },
    {
      title: 'Tasks by Type',
      dataSource: typeRatio,
    },
  ];

  const pies = pieCharts.map((options, i) => (
    <Grid item key={i}>
      <Paper
        elevation={3}
        sx={{ padding: 2, mt: 2, mb: 2, textAlign: 'center' }}
      >
        <PieChart
          className='pie'
          title={options.title}
          palette={[['#F5564A'], ['#03A9F4'], ['#99CC66']]}
          theme={'material.blue.light'}
          sizeGroup='piesGroup'
          dataSource={options.dataSource}
        >
          <Size height={350} width={350} />
          <Series argumentField='name' valueField='area'>
            <Label
              visible={true}
              position='inside'
              format='percent'
              customizeText={point => {
                if (point.value === 0) {
                  return '';
                } else return point.percentText;
              }}
            />
          </Series>
          <Legend
            verticalAlignment='bottom'
            horizontalAlignment='center'
            itemTextPosition='right'
            rowCount={2}
          />
        </PieChart>
      </Paper>
    </Grid>
  ));

  return (
    <Grid container justifyContent='space-evenly' spacing={2}>
      <Grid item xs={12} textAlign='center' margin={2}>
        <Typography variant='title'>You got this, {firstName}!</Typography>
      </Grid>
      {isLoading ? (
        <CircularProgress size='7rem' />
      ) : tasks.length !== 0 ? (
        pies
      ) : (
        <Paper
          elevation={3}
          sx={{ padding: 2, mt: 2, mb: 2, textAlign: 'center' }}
        >
          <Typography variant='h5'>No tasks are assigned to you</Typography>
          <img
            src={nodatamorning}
            alt='No tasks available'
            height='auto'
            width='500px'
            style={{ borderRadius: '5px', margin: '10px' }}
          />
        </Paper>
      )}
    </Grid>
  );
}

export default DashBoard;
