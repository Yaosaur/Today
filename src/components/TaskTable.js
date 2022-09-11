import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

function dateTransformer(date) {
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month}-${day}-${year}`;
}

function TaskTable(props) {
  const nav = useNavigate();
  const location = useLocation();

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 175,
      flex: 1,
      textAlign: 'center',
    },
    { field: 'issuer', headerName: 'Issuer', width: 130 },
    { field: 'assignedTo', headerName: 'Assigned To', minWidth: 200, flex: 1 },
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

  let transformedData = props.taskData.map(task => {
    let transformedMembers = task.assignedTo
      .map(member => `${member.firstName} ${member.lastName}`)
      .join(', ');
    return {
      ...task,
      id: task._id,
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
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={params => {
          nav(location.pathname + `/tasks/${params.id}`);
        }}
      />
    </div>
  );
}

export default TaskTable;
