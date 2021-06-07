import { makeStyles } from '@material-ui/core/styles';

export function getActionBtnStyle(view, btnClasses) {
  switch (view) {
    case 'initial':
      return btnClasses.primaryBtn;
    default:
      return btnClasses.primaryBtn;
  }
}

export function getHelperBtnStyle(view, btnClasses) {
  switch (view) {
    case 'initial':
    case 'act':
    case 'pause':
      return btnClasses.helperBtn;
    default:
      return btnClasses.helperBtn;
  }
}

export function getBarStyle(view, classes) {
  switch (view) {
    case 'initial':
      return classes.barGrey;
    case 'act':
    case 'hover':
    case 'stopAct':
      return classes.barRed;
    case 'pause':
    case 'stopPause':
      return classes.barGreen;
    default:
      return classes.barGrey;
  }
}

export function getTimerFaceStyle(view, classes) {
  switch (view) {
    case 'initial':
      return classes.timerFaceMain;
    case 'act':
      return classes.timerFaceRed;
    case 'pause':
    case 'stopPause':
      return classes.timerFaceGreen;
    case 'hover':
      return classes.timerFaceStop;
    default:
      return classes.timerFaceMain;
  }
}

export function getHelperBtnTitle(view) {
  switch (view) {
    case 'initial':
    case 'act':
    case 'hover':
      return 'Стоп';
    case 'stopAct':
      return 'Сделано';
    case 'stopPause':
    case 'pause':
      return 'Пропустить';
    default:
      return 'Стоп';
  }
}

export function getActBtnTitle(view) {
  switch (view) {
    case 'initial':
      return 'Старт';
    case 'act':
    case 'hover':
      return 'Пауза';
    case 'stopAct':
    case 'stopPause':
      return 'Продолжить';
    case 'pause':
      return 'Пауза';
    default:
      return 'Старт';
  }
}

export const usePomodoroTimerStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    backgroundColor: theme.palette.input.main,
  },
  barGrey: {
    backgroundColor: theme.palette.timer.headerBarMain,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '30px',
    padding: '10px',
    [theme.breakpoints.up(500)]: {
      marginBottom: '40px',
    },
  },
  barRed: {
    backgroundColor: theme.palette.timer.headerBarAct,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '30px',
    padding: '10px',
    [theme.breakpoints.up(500)]: {
      marginBottom: '40px',
    },
  },
  barGreen: {
    backgroundColor: theme.palette.timer.headerBarPause,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '30px',
    padding: '10px',
    [theme.breakpoints.up(500)]: {
      marginBottom: '40px',
    },
  },
  headerBarText: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.timer.headerBarText,
    [theme.breakpoints.up(500)]: {
      fontSize: '1.1rem',
    },
  },
  timerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  timerFaceMain: {
    fontSize: '5rem',
    fontWeight: 200,
    color: theme.palette.text.primary,
    [theme.breakpoints.up(500)]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '10rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '10rem',
    },
  },
  timerFaceRed: {
    fontSize: '5rem',
    fontWeight: 200,
    color: theme.palette.timer.headerBarAct,
    [theme.breakpoints.up(500)]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '10rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '10rem',
    },
  },
  timerFaceGreen: {
    fontSize: '5rem',
    fontWeight: 200,
    color: theme.palette.timer.headerBarPause,
    [theme.breakpoints.up(500)]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '10rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '10rem',
    },
  },
  timerFaceStop: {
    fontSize: '5rem',
    fontWeight: 200,
    color: theme.palette.graph.barHover,
    [theme.breakpoints.up(500)]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '10rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '7rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '10rem',
    },
  },
  addBtn: {
    alignSelf: 'center',
    '&:hover': {
      color: theme.palette.primaryBtn.hover,
    }
  },
  addBtnIcon: {
    fontSize: '2rem',
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '3rem',
    },
  },
  timerContent: {
    fontSize: '1rem',
    textAlign: 'center',
  },
  timerContentRemark: {
    color: theme.palette.timer.remark,
  },
  actionsBar: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(3),
    },
  },
}));
