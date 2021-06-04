import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { reactLocalStorage } from 'reactjs-localstorage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import PropTypes from 'prop-types';
import {
  getActionBtnStyle,
  getBarStyle,
  getHelperBtnStyle,
  getTimerFaceStyle,
  usePomodoroTimerStyles
} from './pomodoroTimerStyles';





export function PomodoroTimer({ currentTask }) {
  const btnClasses = makeBtnStyles();
  const classes = usePomodoroTimerStyles();

  const [view, setView] = useState('initial'); // 'initial' - исходное состояние

  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  // const [currentTask, setCurrentTask] = useState([]);

  const [countPomodoro, setCountPomodoro] = useState(1);
  // const [currentTime, setCurrentTime] = useState(new Date());
  //
  // useEffect(() => {
  //   const watch = setInterval (() => {
  //     setCurrentTime(new Date());
  //   }, 60000);
  //
  //   return () => {
  //     clearInterval(watch);
  //   };
  // }, [])

  // 10: [
  //   { numberOfDay: 1, timerUsageTime: 10, finishedTomatoesTime: 20, pauseTime: 30, stopCount: 20, pomodoroCount: 3 },


  // todoList
  // const [currentThemeName, setCurrentThemeName] = useLocalStorage('todos');

  // categories: ["Работа", "Учеба", "Новая категория", "Английский", "Еще категория", "И еще категория"]
  // durationOfLongPause: 15
  // durationOfPomodoro: "40"
  // durationOfShotPause: "9"
  // frequencyOfLongPauses: 3
  // userName: "Denis"
  const [currentTimer, setCurrentTimer] = useState(+settings.durationOfPomodoro * 60 * 1000);

  function handleClickActBtn(view) {
    switch (view) {
      case 'stopAct':
      case 'initial':
        setView('act');
        break;
      case 'act':
        setView('stopAct');
        break;
      case 'pause':
        setView('stopPause');
        break;
      case 'stopPause':
        setView('pause');
        break;
      default:
        console.log('Hi');
    }
  }

  function handleClickHelperBtn(view) {
    switch (view) {
      case 'act':
      case 'hover':
        setView('initial');
        break;
      case 'stopAct':
        setView('initial');
        // + помидор и + время
        break;
      case 'pause':
      case 'stopPause':
        setView('initial');
        // + время паузы
        break;
      default:
        console.log('Hi')
    }
  }

  function onMouseMotion(view) {
    switch (view) {
      case 'act':
        setView('hover')
        break;
      case 'hover':
        setView('act')
        break;
      default:
        console.log('Hi')
    }
  }

  function getActBtnTitle(view) {
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

  function getHelperBtnTitle(view) {
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





  useEffect(() => {
    console.log(currentTimer)
    // console.log(currentThemeName);
    console.log(currentTask)
    // setCurrentTask(Object.values(reactLocalStorage.getObject('todos')).sort((a, b) => a.order - b.order)[0])
  }, [])

  return (
    <Card className={classes.root}>
      <div className={getBarStyle(view, classes)}>
        <Typography variant='h2' color='textPrimary' className={classes.headerBarText}>
          { currentTask?.title || 'Задача' }
        </Typography>

        <Typography className={classes.headerBarText}>
          Помидор {countPomodoro}
        </Typography>
      </div>

      <div className={classes.timerWrap}>
        <span className={getTimerFaceStyle(view, classes)}>25:00</span>

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
        <Button
          variant='contained'
          className={getActionBtnStyle(view, btnClasses)}
          type='button'
          style={{marginRight: 15}}
          onClick={ev => {
            ev.preventDefault();
            handleClickActBtn(view)
          }}
        >
          {getActBtnTitle(view)}
        </Button>

        <Button
          variant='contained'
          className={getHelperBtnStyle(view, btnClasses)}
          type='button'
          disabled={view === 'initial'}
          onClick={ev => {
            ev.preventDefault();
            handleClickHelperBtn(view)
          }}
          onMouseOver={()=> onMouseMotion(view)}
          onMouseOut={() => onMouseMotion(view)}
        >
          {getHelperBtnTitle(view)}
          {/*{(view === 'initial' || view === 'act' || view ==='hover') && 'Стоп'}*/}
          {/*{view === 'stopAct' && 'Сделано'}*/}
          {/*{(view === 'pause' || view === 'stopPause') && 'Пропустить'}*/}
        </Button>
      </CardActions>
    </Card>
  );
}
//
PomodoroTimer.propTypes = {
  currentTask: PropTypes.object,
//   // setTaskUp: PropTypes.func.isRequired,
//   // setTaskDown: PropTypes.func.isRequired,
//   // removeTask: PropTypes.func.isRequired,
//   // editTask: PropTypes.func.isRequired,
}
