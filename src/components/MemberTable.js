import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';

function MemberTable({ creator, members }) {
  const currentUserEmail = useSelector(state => state.auth.user.email);
  const nav = useNavigate();

  const messageButtonHandler = (email, firstName, lastName) => {
    const users = [currentUserEmail, email];
    nav(`/messages/${users.sort().join('&')}`, {
      state: { firstName, lastName },
    });
  };

  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      minWidth: 100,
      flex: 1,
    },
    { field: 'lastName', headerName: 'Last Name', minWidth: 100, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 1.5 },
    {
      field: 'message',
      headerName: 'Message',
      sortable: false,
      disableColumnMenu: true,
      width: 90,
      align: 'center',
      renderCell: params => {
        if (params.row.email !== currentUserEmail) {
          return (
            <IconButton
              color='primary'
              size='small'
              onClick={() =>
                messageButtonHandler(
                  params.row.email,
                  params.row.firstName,
                  params.row.lastName
                )
              }
            >
              <MessageIcon fontSize='small' />
            </IconButton>
          );
        }
      },
    },
  ];

  let allMembers = [creator, ...members];
  let transformedData = allMembers.map((member, index) => {
    if (index === 0) {
      return {
        ...member,
        firstName: `${member.firstName} (Creator)`,
        id: index,
      };
    }
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
