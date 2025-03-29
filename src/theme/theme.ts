import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1c282f', // Gunmetal
      light: '#516474', // Payne's Gray
      dark: '#88aae5', // Vista Blue
    },
    secondary: {
      main: '#88aae5', // Vista Blue
      light: '#f6f8fa', // Anti-Flash White
      dark: '#3d5766', // Darker Gunmetal
    },
    background: {
      default: '#f6f8fa', // Anti-Flash White
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1c282f', // Gunmetal
      light: '#516474', // Payne's Gray
      dark: '#88aae5', // Vista Blue
    },
    secondary: {
      main: '#88aae5', // Vista Blue
      light: '#f6f8fa', // Anti-Flash White
      dark: '#3d5766', // Darker Gunmetal
    },
    background: {
      default: '#06080a', // Dark Gunmetal
      paper: '#11181d', // Slightly Lighter Gunmetal
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
