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
      tick: '#02a191',
    },
    statistics: {
      focusLight: '#c77902',
      focusDark: '#eaa031',
      pauseLight: '#1504bb',
      pauseDark: '#716bbf',
      stopLight: '#016d90',
      stopDark: '#56aac4',
      emptyLight: '#404040',
      emptyDark: '#a8a6a6',
      countText: '#016d90',
    },
    timer: {
      headerBarMain: '#1b1b1b',
      headerBarText: '#a8a6a6',
      remark: '#a8a6a6',
    }
  },
};
