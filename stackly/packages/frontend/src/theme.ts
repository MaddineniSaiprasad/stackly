import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06b6d4', // Vibrant Cyan/Teal
      light: '#67e8f9',
      dark: '#0e7490',
      contrastText: '#0f172a',
    },
    secondary: {
      main: '#6366f1', // Premium Indigo
      light: '#818cf8',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    background: {
      default: '#070a13', // Deep medical command center dark background
      paper: '#111827',   // Slate gray card paper background
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#070a13',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#070a13',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#1f2937',
            borderRadius: '10px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 18px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          color: '#070a13',
          '&:hover': {
            background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(6, 182, 212, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#06b6d4',
            boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.15)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          '& th': {
            fontWeight: 600,
            color: '#94a3b8',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          '&:last-child': {
            borderBottom: 'none',
          },
        },
      },
    },
  },
});

export default theme;
