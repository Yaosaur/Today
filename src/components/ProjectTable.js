import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

function ProjectTable({ projectData }) {
  const nav = useNavigate();
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 130,
      flex: 1,
    },
    { field: 'description', headerName: 'Description', minWidth: 130, flex: 1 },
    { field: 'members', headerName: 'Members', minWidth: 130, flex: 1 },
  ];

  let transformedData = projectData.map(project => {
    let transformedMembers = project.members
      .map(member => `${member.firstName} ${member.lastName}`)
      .join(', ');
    return { ...project, id: project._id, members: transformedMembers };
  });

  const rows = transformedData;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rowHeight={30}
        localeText={{ noRowsLabel: 'No data to display' }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={params => {
          nav(`/projects/${params.id}`);
        }}
      />
    </div>
  );
}

export default ProjectTable;
