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
      primary: '#81d4fa',
      secondary: '#ea80fc'
    },
    background: {
      paper: '#404040',
      default: '#494949',
    },
    divider: '#7ecb20',
    primaryBtn: {
      text: '#f3f3f3',
      main: '#02a191',
      hover: '#03DAC5',
    },
    secondaryBtn: {
      text: '#ffffff',
      main: '#DC3E22',
      hover: '#B7280F',
    },
    dotedBtn: {
      main: '#b2ff59',
      text: '#ea80fc',
    },
    input: {
      main: '#404040',
      text: '#e7ff8c',
    },
    errorText: {
      main: '#f44336',
    },
    graph: {
      bar: '#ea80fc',
      barHover: '#bd04dc',
      footerBar: '#373737',
      grid: '#81d4fa',
    },
  },
};
