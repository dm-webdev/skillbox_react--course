import { breakpoints } from './common'


export const darkTheme = {
  ...breakpoints,
  palette: {
    type: 'dark',
    primary: {
      main: '#373737',
      light: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#e7ff8c',
    },
    secondary: {
      main: '#b2ff59',
      light: '#e7ff8c',
      dark: '#7ecb20',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#ea80fc',
      secondary: '#81d4fa'
    },
    background: {
      paper: '#404040',
      default: '#494949',
    },
    divider: '#7ecb20',
  },
};
