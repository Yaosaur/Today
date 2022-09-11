import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

function ProjectTable({ projectData }) {
  const nav = useNavigate();
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 175,
      flex: 1,
      textAlign: 'center',
    },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'members', headerName: 'Members', minWidth: 200, flex: 1 },
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
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={params => {
          nav(`/projects/${params.id}`);
        }}
      />
    </div>
  );
}

export default ProjectTable;
