import { DataGrid } from '@mui/x-data-grid';

function dateTransformer(date) {
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month}-${day}-${year}`;
}

function TaskTable(props) {
  const columns = [
    { field: 'title', headerName: 'Title', width: 70 },
    { field: 'issuer', headerName: 'Issuer', width: 130 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 300 },
    { field: 'dateCreated', headerName: 'Date Created', width: 200 },
    {
      field: 'deadline',
      headerName: 'Deadline',
      width: 200,
    },
    { field: 'priority', headerName: 'Priority', width: 90 },
    { field: 'type', headerName: 'Type', width: 90 },
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
      />
    </div>
  );
}

export default TaskTable;
