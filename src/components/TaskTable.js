import { useNavigate } from 'react-router-dom';
import dateTransformer from '../utils/dateTransformer';

import { DataGrid } from '@mui/x-data-grid';

function TaskTable({ taskData, project }) {
  const nav = useNavigate();

  const projectPage = [
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 175,
      flex: 1,
      textAlign: 'center',
    },
    { field: 'issuer', headerName: 'Issuer', width: 130 },
    { field: 'assignedTo', headerName: 'Assigned To', minWidth: 150, flex: 1 },
    { field: 'dateCreated', headerName: 'Date Created', width: 200 },
    {
      field: 'deadline',
      headerName: 'Deadline',
      width: 200,
    },
    { field: 'priority', headerName: 'Priority', width: 90 },
    { field: 'type', headerName: 'Type', minWidth: 150 },
    { field: 'status', headerName: 'Status', minWidth: 150 },
  ];

  const tasksPage = [
    {
      field: 'project',
      headerName: 'Project',
      minWidth: 175,
      flex: 1,
      textAlign: 'center',
    },
    ...projectPage,
  ];

  let columns;
  if (project) {
    columns = projectPage;
  } else {
    columns = tasksPage;
  }

  let transformedData = taskData.map(task => {
    let transformedMembers = task.assignedTo
      .map(member => `${member.firstName} ${member.lastName}`)
      .join(', ');
    return {
      ...task,
      id: task._id,
      project: task.project.title,
      issuer: `${task.issuer.firstName} ${task.issuer.lastName}`,
      assignedTo: transformedMembers,
      dateCreated: dateTransformer(task.dateCreated),
      deadline: dateTransformer(task.deadline),
    };
  });

  const rows = [...transformedData];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rowHeight={30}
        localeText={{ noRowsLabel: 'No data to display' }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={params => {
          nav(`/tasks/${params.id}`);
        }}
      />
    </div>
  );
}

export default TaskTable;
