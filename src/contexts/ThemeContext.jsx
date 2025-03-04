import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create context
const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light'
});

export function ThemeProvider({ children }) {
  // Check localStorage for saved preference
  const savedMode = localStorage.getItem('themeMode');
  const [mode, setMode] = useState(savedMode === 'dark' ? 'dark' : 'light');
  
  // Save preference when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    
    // Update document level attributes
    document.documentElement.setAttribute('data-theme', mode);
    
    // Apply theme to body
    if (mode === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Create theme based on current mode with comprehensive colors
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode comprehensive palette
                primary: {
                  main: '#1976d2',
                  light: '#42a5f5',
                  dark: '#1565c0',
                  contrastText: '#ffffff',
                },
                secondary: {
                  main: '#9c27b0',
                  light: '#ba68c8',
                  dark: '#7b1fa2',
                  contrastText: '#ffffff',
                },
                error: {
                  main: '#d32f2f',
                  light: '#ef5350',
                  dark: '#c62828',
                  contrastText: '#ffffff',
                },
                warning: {
                  main: '#ed6c02',
                  light: '#ff9800',
                  dark: '#e65100',
                  contrastText: '#ffffff',
                },
                info: {
                  main: '#0288d1',
                  light: '#03a9f4',
                  dark: '#01579b',
                  contrastText: '#ffffff',
                },
                success: {
                  main: '#2e7d32',
                  light: '#4caf50',
                  dark: '#1b5e20',
                  contrastText: '#ffffff',
                },
                grey: {
                  50: '#fafafa',
                  100: '#f5f5f5',
                  200: '#eeeeee',
                  300: '#e0e0e0',
                  400: '#bdbdbd',
                  500: '#9e9e9e',
                  600: '#757575',
                  700: '#616161',
                  800: '#424242',
                  900: '#212121',
                },
                text: {
                  primary: 'rgba(0, 0, 0, 0.87)',
                  secondary: 'rgba(0, 0, 0, 0.6)',
                  disabled: 'rgba(0, 0, 0, 0.38)',
                },
                divider: 'rgba(0, 0, 0, 0.12)',
                background: {
                  paper: '#ffffff',
                  default: '#f5f5f5',
                },
                action: {
                  active: 'rgba(0, 0, 0, 0.54)',
                  hover: 'rgba(0, 0, 0, 0.04)',
                  selected: 'rgba(0, 0, 0, 0.08)',
                  disabled: 'rgba(0, 0, 0, 0.26)',
                  disabledBackground: 'rgba(0, 0, 0, 0.12)',
                },
              }
            : {
                // Dark mode comprehensive palette
                primary: {
                  main: '#90caf9',
                  light: '#e3f2fd',
                  dark: '#42a5f5',
                  contrastText: 'rgba(0, 0, 0, 0.87)',
                },
                secondary: {
                  main: '#ce93d8',
                  light: '#f3e5f5',
                  dark: '#ab47bc',
                  contrastText: 'rgba(0, 0, 0, 0.87)',
                },
                error: {
                  main: '#f44336',
                  light: '#e57373',
                  dark: '#d32f2f',
                  contrastText: '#ffffff',
                },
                warning: {
                  main: '#ffa726',
                  light: '#ffb74d',
                  dark: '#f57c00',
                  contrastText: 'rgba(0, 0, 0, 0.87)',
                },
                info: {
                  main: '#29b6f6',
                  light: '#4fc3f7',
                  dark: '#0288d1',
                  contrastText: 'rgba(0, 0, 0, 0.87)',
                },
                success: {
                  main: '#66bb6a',
                  light: '#81c784',
                  dark: '#388e3c',
                  contrastText: 'rgba(0, 0, 0, 0.87)',
                },
                grey: {
                  50: '#fafafa',
                  100: '#f5f5f5',
                  200: '#eeeeee',
                  300: '#e0e0e0',
                  400: '#bdbdbd',
                  500: '#9e9e9e',
                  600: '#757575',
                  700: '#616161',
                  800: '#424242',
                  900: '#212121',
                  A100: '#f5f5f5',
                  A200: '#eeeeee',
                  A400: '#bdbdbd',
                  A700: '#616161',
                },
                text: {
                  primary: '#ffffff',
                  secondary: 'rgba(255, 255, 255, 0.7)',
                  disabled: 'rgba(255, 255, 255, 0.5)',
                  icon: 'rgba(255, 255, 255, 0.5)',
                },
                divider: 'rgba(255, 255, 255, 0.12)',
                background: {
                  paper: '#1e1e1e',
                  default: '#121212',
                },
                action: {
                  active: '#ffffff',
                  hover: 'rgba(255, 255, 255, 0.08)',
                  hoverOpacity: 0.08,
                  selected: 'rgba(255, 255, 255, 0.16)',
                  selectedOpacity: 0.16,
                  disabled: 'rgba(255, 255, 255, 0.3)',
                  disabledBackground: 'rgba(255, 255, 255, 0.12)',
                  disabledOpacity: 0.38,
                  focus: 'rgba(255, 255, 255, 0.12)',
                  focusOpacity: 0.12,
                  activatedOpacity: 0.24,
                },
              }),
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#1976d2' : '#272727',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s, color 0.3s',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                transition: 'background-color 0.3s',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s, color 0.3s',
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'color 0.3s',
              },
            },
          },
          MuiListItem: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottomColor: mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.12)' 
                  : 'rgba(255, 255, 255, 0.12)',
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s, border-color 0.3s',
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              icon: {
                color: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)',
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 0.3s, color 0.3s',
                scrollbarColor: mode === 'light' 
                  ? '#bdbdbd #f5f5f5'
                  : '#424242 #1e1e1e',
                '&::-webkit-scrollbar': {
                  width: '10px',
                  height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: mode === 'light' ? '#bdbdbd' : '#424242',
                  borderRadius: '5px',
                  '&:hover': {
                    background: mode === 'light' ? '#9e9e9e' : '#616161',
                  },
                },
              },
            },
          },
        },
        shape: {
          borderRadius: 4,
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
          h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
          },
          h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 500,
          },
        },
        transitions: {
          duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
          },
        },
        zIndex: {
          mobileStepper: 1000,
          fab: 1050,
          speedDial: 1050,
          appBar: 1100,
          drawer: 1200,
          modal: 1300,
          snackbar: 1400,
          tooltip: 1500,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Custom hook to use the color mode context
export const useColorMode = () => useContext(ColorModeContext); 