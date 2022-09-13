import { DataGrid } from '@mui/x-data-grid';

function MemberTable({ members }) {
  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      minWidth: 130,
      flex: 1,
    },
    { field: 'lastName', headerName: 'Last Name', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
  ];

  let transformedData = members.map((member, index) => {
    return { ...member, id: index };
  });

  const rows = transformedData;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rowHeight={30}
        localeText={{ noRowsLabel: 'No data to display' }}
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default MemberTable;
