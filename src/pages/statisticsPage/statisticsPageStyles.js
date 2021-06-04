import { makeStyles } from '@material-ui/core';

export const useStatisticsPageStyles = makeStyles(theme => ({
  subheading: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  selectOptions: {
    color: theme.palette.input.text,
  },
  toRight: {
    margin: '0 0 0 auto',
  },
  weekSelect: {
    margin: 0,
  },
  paperGraph: {
    padding: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: theme.palette.input.main,
    borderRadius: 0,
  },
  infoBlock: {
    height: '100%',
    transition: 'background-color 0.5s',
  },
  blockHeading: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.4rem',
    },
  },
  blockValue: {
    margin: 0,
    textAlign: 'center',
    fontSize: '2.1rem',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.2rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '3rem',
    },
  },
  blockIconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusIcon: {
    textAlign: 'center',
    width: '4rem',
    height: '4rem',
    transition: 'color 0.5s',
    [theme.breakpoints.up('sm')]: {
      width: '3.5rem',
      height: '3.5rem',
    },
    [theme.breakpoints.up(1000)]: {
      width: '5rem',
      height: '5rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '6rem',
      height: '6rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '7rem',
      height: '7rem',
    },
  },
  blockDesk: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    padding: '10px 0',
    [theme.breakpoints.up(1000)]: {
      padding: '15px 0',
    },
    [theme.breakpoints.up('xl')]: {
      padding: '20px 0',
    },
  },
  summary: {
    padding: '0.5rem',
    backgroundColor: theme.palette.input.main,
    [theme.breakpoints.up('sm')]: {
      marginBottom: '10px',
    },
    [theme.breakpoints.up(1000)]: {
      padding: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '1.5rem',
    },
  },
  summaryText: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: '30%',
    },
  },
  timeText: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  tomatoSummary: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.input.main,
  },
  happyTomatoIcon: {
    width: '80px',
    height: '80px',
    [theme.breakpoints.up(1000)]: {
      width: '100px',
      height: '100px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '130px',
      height: '130px',
    },
  },
  tomatoCountWrap: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    margin: 'auto 0',
    fontWeight: 600,
    color: theme.palette.dotedBtn.text,

  },
  tomatoCountDesk: {
    [theme.breakpoints.up(1000)]: {
      fontSize: '2rem',
    },
  },
  tomatoCountIcon: {
    [theme.breakpoints.up(1000)]: {
      width: '60px',
      height: '60px',
    },
    [theme.breakpoints.up('md')]: {
      width: '80px',
      height: '80px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100px',
      height: '100px',
    },
  },
  tomatoCountBar: {
    margin: 'auto 0 0 0',
    padding: '5px 0',
    width: '100%',
    textAlign: 'center',
    fontWeight: 500,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.statistics.countText,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
  },
}))

export function axisStyle(currentWeek, theme, currentDay) {
  return {
    axis: { stroke: 'inherit' },
    grid: { stroke: 'inherit' },
    ticks: {
      stroke: ({ tick }) => !!currentWeek.find(item => item.numberOfDay === tick)?.timerUsageTime
        ? 'inherit'
        : theme.palette.graph.tick,
      strokeWidth: '35px',
      size: 3,
      strokeLinecap: 'butt',
    },
    tickLabels: {
      fontSize: 8,
      padding: 8,
      fill: ({ tick }) => tick === currentDay.numberOfDay
        ? theme.palette.graph.barHover
        : theme.palette.text.primary,
    }
  }
}

export function axisAxeStyle(theme) {
  return {
    axis: {
      stroke: 'inherit'
    },
    grid: {
      stroke: theme.palette.graph.grid,
      strokeDasharray: 0
    },
    ticks: {
      stroke: 'inherit'
    },
    tickLabels: {
      fontSize: 8,
      padding: 7,
      fill: theme.palette.text.primary
    }
  }
}
