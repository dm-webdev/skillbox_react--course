import React, { useContext, useEffect, useState } from 'react';
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
  getActBtnTitle,
  getActionBtnStyle,
  getBarStyle,
  getHelperBtnStyle,
  getHelperBtnTitle,
  getTimerFaceStyle,
  usePomodoroTimerStyles,
} from './pomodoroTimerStyles';
import { getFormatTime } from '../../../common/utils/timerHelpers';
import { getISODay, getISOWeek } from 'date-fns';
import { AppModalContext } from '../Modal/AppModalProvider';
import modalVariants from '../Modal/modalVariants';
import { getNumberCount } from '../../../common/utils/formatUtils';
import { INITIAL_SETTINGS, INITIAL_WEEKLY_STATISTICS } from '../../../common/utils/constants';


export function PomodoroTimer({ currentTask, setTodos, setCurrentTask }) {
  const btnClasses = makeBtnStyles();
  const classes = usePomodoroTimerStyles();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const { isModalOpen, modalProps, setModalProps, setModalOpen } = useContext(AppModalContext);

  const [view, setView] = useState('initial');
  const [currentTime, setCurrentTime] = useState((settings?.durationOfPomodoro || INITIAL_SETTINGS.durationOfPomodoro) * 60 * 1000);
  const [timerUsageTime, setTimerUsageTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [finishedTomatoesTime, setFinishedTomatoesTime] = useState(0);
  const [timeForFinishedTomatoes, setTimeForFinishedTomatoes] = useState(0);

  useEffect(() => {
    const currentWeek = (getISOWeek(new Date()) + 1).toString();
    const numberOfDay = getISODay(new Date()).toString();
    const statisticsData = reactLocalStorage.getObject('statistics') || {};

    if (!statisticsData[currentWeek]) {
      statisticsData[currentWeek] = INITIAL_WEEKLY_STATISTICS;
    } else if (Object.keys(statisticsData).includes(currentWeek)) {
      const key = statisticsData[currentWeek].findIndex(item => item.numberOfDay === numberOfDay);
      statisticsData[currentWeek][key]['timerUsageTime'] +=  Math.ceil(timerUsageTime / 60000);
      statisticsData[currentWeek][key]['finishedTomatoesTime'] += Math.ceil(finishedTomatoesTime / 60000);
      statisticsData[currentWeek][key]['pauseTime'] += Math.ceil(pauseTime / 60000);
      statisticsData[currentWeek][key]['stopCount'] += stopCount;
      statisticsData[currentWeek][key]['pomodoroCount'] += pomodoroCount;
      statisticsData[currentWeek][key]['numberOfDay'] = numberOfDay;
    }

    reactLocalStorage.setObject('statistics', statisticsData);
    setTimerUsageTime(0);
    setFinishedTomatoesTime(0);
    setPauseTime(0);
    setStopCount(0);
    setPomodoroCount(0);
  }, [view]);

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
        return null;
    }
  }

  function handleClickHelperBtn(view) {
    switch (view) {
      case 'act':
      case 'hover':
        setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
        setStopCount(stopCount + 1);
        setTimeForFinishedTomatoes(0);
        setView('initial');
        break;
      case 'stopAct':
        const isShowMessages = reactLocalStorage.get('isSendMessages')  === 'true';
        const tasks = reactLocalStorage.getObject('todos');
        setPomodoroCount(pomodoroCount + 1);
        tasks[currentTask.id].spentTomatoes += 1;
        tasks[currentTask.id].done = true;
        tasks[currentTask.id].order = -10;
        setTodos(tasks);
        setCurrentTask(tasks[currentTask.id]);
        reactLocalStorage.setObject('todos', tasks);
        setFinishedTomatoesTime(timeForFinishedTomatoes);
        setTimeForFinishedTomatoes(0);
        setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
        setView('initial');
        if (isShowMessages) {
          console.log(isShowMessages);
          setModalOpen(!isModalOpen);
          setModalProps(modalVariants.successByDone);
        }
        break;
      case 'pause':
        setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
        setStopCount(stopCount + 1);
        setTimeForFinishedTomatoes(0);
        setView('initial');
        break;
      case 'stopPause':
        setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
        setTimeForFinishedTomatoes(0);
        setView('initial');
        break;
      default:
        return null;
    }
  }

  function onMouseMotion(view) {
    switch (view) {
      case 'act':
        setView('hover');
        break;
      case 'hover':
        setView('act');
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    const isShowMessages = reactLocalStorage.get('isSendMessages')  === 'true';
    const watch = setInterval (() => {
      switch(view) {
        case 'act':
        case 'hover':
          setCurrentTime(currentTime - 1000);
          setTimerUsageTime(timerUsageTime + 1000);
          setTimeForFinishedTomatoes(timeForFinishedTomatoes + 1000);

          if (currentTime <= 0) {
            const tasks = reactLocalStorage.getObject('todos');
            setPomodoroCount(pomodoroCount + 1);
            tasks[currentTask.id].spentTomatoes += 1;
            setTodos(tasks);
            setCurrentTask(tasks[currentTask.id])
            reactLocalStorage.setObject('todos', tasks);
            setCurrentTime(
              !!tasks[currentTask.id].spentTomatoes && !(tasks[currentTask.id].spentTomatoes % +settings.frequencyOfLongPauses)
                ? +settings.durationOfLongPause * 60 * 1000
                : +settings.durationOfShotPause * 60 * 1000);
            setFinishedTomatoesTime(timeForFinishedTomatoes);
            setTimeForFinishedTomatoes(0);
            setView('pause');
            if (isShowMessages) {
              setModalOpen(!isModalOpen);
              setModalProps(modalVariants.successByAct);
            }
          }
          break;
        case 'pause':
          setCurrentTime(currentTime - 1000);
          setTimerUsageTime(timerUsageTime + 1000);

          if (currentTime <= 0) {
            const tasks = reactLocalStorage.getObject('todos');
            tasks[currentTask.id].spentPauses += 1;
            setTodos(tasks);
            setCurrentTask(tasks[currentTask.id])
            reactLocalStorage.setObject('todos', tasks);
            setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
            setView('initial');
            if (isShowMessages) {
              setModalOpen(!isModalOpen);
              setModalProps(modalVariants.successByPause);
            }
          }
          break;
        case 'stopAct':
        case 'stopPause':
          setTimerUsageTime(timerUsageTime + 1000);
          setPauseTime(pauseTime + 1000);
          break;
        default:
          return null
      }
    }, 1000);

    return () => {
      clearInterval(watch);
    };
  }, [view, currentTime, timerUsageTime, pomodoroCount, pauseTime, timeForFinishedTomatoes]);

  return (
    <Card className={classes.root}>
      <div className={getBarStyle(view, classes)}>
        <Typography variant='h2' color='textPrimary' className={classes.headerBarText}>
          {currentTask?.title || 'Задача'}
        </Typography>

        <Typography className={classes.headerBarText}>
          {!(view === 'pause' || view === 'stopPause')
            ? `Помидор ${getNumberCount(+currentTask?.spentTomatoes)}`
            : `Перерыв ${getNumberCount(+currentTask?.spentPauses)}`}
        </Typography>
      </div>

      <div className={classes.timerWrap}>
        <span className={getTimerFaceStyle(view, classes)}>{getFormatTime(currentTime)}</span>

        <IconButton
          aria-label='увеличить интервал'
          className={classes.addBtn}
          disabled={!(view === 'pause' || view === 'initial')}
          type='button'
          onClick={ev => {
            setCurrentTime(currentTime + 3 * 60 * 1000)
          }}
        >
          <AddCircleIcon className={classes.addBtnIcon} />
        </IconButton>
      </div>

      <CardContent>
        <Typography variant='body2' color='textPrimary' component='p' className={classes.timerContent}>
          {
            currentTask?.title
              ? <><span className={classes.timerContentRemark}>Задача - </span>{currentTask?.title}</>
              : 'Выбирите задачу!'
          }
        </Typography>
      </CardContent>

      <CardActions
        className={classes.actionsBar}
      >
        <Button
          variant='contained'
          className={getActionBtnStyle(view, btnClasses)}
          type='button'
          style={{ marginRight: 15 }}
          onClick={ev => {
            ev.preventDefault();
            handleClickActBtn(view)
          }}
          disabled={!Object.keys(currentTask || {}).length}
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
        </Button>
      </CardActions>
    </Card>
  );
}

PomodoroTimer.propTypes = {
  currentTask: PropTypes.object,
  setTodos: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
}
