import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { reactLocalStorage } from 'reactjs-localstorage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import useLocalStorage from 'react-use-localstorage';
import PropTypes from 'prop-types';


const usePomodoroTimerStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    backgroundColor: theme.palette.input.main,
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '30px',
    padding: '10px',
    backgroundColor: theme.palette.timer.headerBarMain,
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
  timerFace: {
    fontSize: '5rem',
    fontWeight: 200,
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


export function PomodoroTimer({ currentTask }) {
  const btnClasses = makeBtnStyles();
  const classes = usePomodoroTimerStyles();

  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  // const [currentTask, setCurrentTask] = useState([]);

  const [countPomodoro, setCountPomodoro] = useState(1);


  // todoList
  // const [currentThemeName, setCurrentThemeName] = useLocalStorage('todos');



  useEffect(() => {
    // console.log(currentThemeName);
    console.log('mix')
    // setCurrentTask(Object.values(reactLocalStorage.getObject('todos')).sort((a, b) => a.order - b.order)[0])
  }, [])

  return (
    <Card className={classes.root}>
      <div className={classes.headerBar}>
        <Typography variant='h2' color='textPrimary' className={classes.headerBarText}>
          { currentTask?.title || 'Задача' }
        </Typography>

        <Typography className={classes.headerBarText}>
          Помидор {countPomodoro}
        </Typography>
      </div>

      <div className={classes.timerWrap}>
        <span className={classes.timerFace}>25:00</span>

        <IconButton aria-label="add to favorites" className={classes.addBtn}>
          <AddCircleIcon className={classes.addBtnIcon} />
        </IconButton>
      </div>

      <CardContent>
        <Typography variant='body2' color='textPrimary' component='p' className={classes.timerContent}>

          {currentTask?.title ? <><span className={classes.timerContentRemark}>Задача 1 - </span>{currentTask?.title}</> : 'Выбирите задачу!'}
        </Typography>
      </CardContent>

      <CardActions
        className={classes.actionsBar}
      >
        <Button variant='contained' className={btnClasses.primaryBtn} type='submit' style={{marginRight: 15}}>
          Старт
        </Button>

        <Button variant='contained' className={btnClasses.secondaryBtn} type='submit'>
          Стоп
        </Button>
      </CardActions>
    </Card>
  );
}

PomodoroTimer.propTypes = {
  currentTask: PropTypes.array,
  // setTaskUp: PropTypes.func.isRequired,
  // setTaskDown: PropTypes.func.isRequired,
  // removeTask: PropTypes.func.isRequired,
  // editTask: PropTypes.func.isRequired,
}
