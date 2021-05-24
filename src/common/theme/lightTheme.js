import { breakpoints } from './common';


export const lightTheme = {
  ...breakpoints,
  palette: {
    type: 'light',
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#4ba3c7',
    },
    secondary: {
      light: '#534bae',
      main: '#DC3E22',
      dark: '#000051',
      contrastText: '#81d4fa',
    },
    text: {
      primary: '#333333',
      secondary: '#000051'
    },
    divider: '#DC3E22',
    primaryBtn: {
      text: '#ffffff',
      main: '#A8B64F',
      hover: '#899441',
    },
    dotedBtn: {
      main: '#C4C4C4',
      text: '#999999',
    },
    input: {
      main: '#F4F4F4',
      text: '#999999',
    },
  },
};
