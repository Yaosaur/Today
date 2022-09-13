const theme = {
  typography: {
    h4: {
      display: 'inline',
      fontSize: '1.7rem',
    },
    title: {
      fontFamily: 'Train One, cursive',
      fontSize: '2.5rem',
    },
  },
  palette: {
    secondary: {
      main: '#00b0ff',
      light: '#69e2ff',
      dark: '#0081cb',
    },
    success: {
      main: '#9ccc65',
      light: '#cfff95',
      dark: '#6b9b37',
    },
    error: {
      main: '#ff5722',
      light: '#ff8a50',
      dark: '#c41c00',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          backgroundColor: '#90caf9',
        },
        footerContainer: {
          backgroundColor: '#e3f2fd',
        },
      },
    },
  },
};

export default theme;
