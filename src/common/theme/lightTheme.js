import { breakpoints } from './common';


export const lightTheme = {
  ...breakpoints,
  palette: {
    type: 'light',
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#4ba3c7',
      contrastText: '#DC3E22',
    },
    secondary: {
      light: '#534bae',
      // main: '#1a237e',
      main: '#DC3E22',
      dark: '#000051',
      contrastText: '#81d4fa',
    },
    text: {
      primary: '#333333',
      secondary: '#000051'
    },
    // background: {
    //   paper: '#e1f5fe',
    //   default: '#fdffff',
    // },
    divider: '#DC3E22',
  },
};
