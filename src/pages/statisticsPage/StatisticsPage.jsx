import {
  Divider,
  Grid,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import React, { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import {
  capitalizeFirstLetter,
  declOfNum,
  getHumanTimeInterval,
  getTimeLabelForAxe,
  getTimeLabelForPause,
} from '../../common/utils/formatUtils';
import { ToDoFormControl } from '../../reusable/customMUI/customInput';
import {
  MenuSelectProps,
  ToDoSelect,
  ToDoSelectInput,
} from '../../reusable/customMUI/customSelect';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import { Background, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { ReactComponent as HappyTomato } from '../../assets/img/happy-tomato.svg';
import { ReactComponent as Tomato } from '../../assets/img/tomato.svg';
import { DAYS_LIST, DEFAULT_STATISTICS } from '../../common/utils/constants';
import { axisAxeStyle, axisStyle, useStatisticsPageStyles } from './statisticsPageStyles';


function StatisticsPage() {
  const theme = useTheme();
  const classes = useStatisticsPageStyles();
  const statisticsData = reactLocalStorage.getObject('statistics');
  const presentData = Object.keys(statisticsData).length ? statisticsData : DEFAULT_STATISTICS;

  const weeks = Object.keys(presentData).sort((a, b) => Number(b) - Number(a));
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const [currentWeekNumber, setCurrentWeekNumber] = useState(weeks[0]);
  const [currentWeek, setCurrentWeek] = useState(presentData[currentWeekNumber]);
  const [currentDay, setCurrentDay] = useState(currentWeek.sort((a, b) => a.numberOfDay - b.numberOfDay)[0]);

  return (
    <section className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        {capitalizeFirstLetter(settings.userName)}, твой прогресс в цифрах!
      </Typography>
      <Divider className='mb-30' />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h2' color='textPrimary' className={classes.subheading}>
                Ваша активность:
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} lg={4} className={classes.toRight}>
              <ToDoFormControl className='m-0'>
                <ToDoSelect
                  input={<ToDoSelectInput disableUnderline={true} />}
                  value={currentWeekNumber}
                  onChange={ev => {
                    setCurrentWeekNumber(ev.target.value);
                    setCurrentWeek(statisticsData[ev.target.value]);
                    setCurrentDay(statisticsData[ev.target.value].sort((a, b) => a.numberOfDay - b.numberOfDay)[0])
                  }}
                  MenuProps={MenuSelectProps}
                >
                  {
                    weeks.map((item, index) => (
                      <MenuItem className={classes.selectOptions} value={item} key={index}>
                        {`Календарная неделя - ${item}`}
                      </MenuItem>
                    ))
                  }
                </ToDoSelect>
              </ToDoFormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid
            container
            style={{height: '100%'}}
            direction='row'
            justify='space-between'
          >
            <Grid item xs={6} sm={12} className={classes.summary}>
              <Typography variant='h2' className={classes.blockHeading}>
                {DAYS_LIST[currentDay.numberOfDay - 1]}:
              </Typography>
              <br/>
              <Typography paragraph className={classes.summaryText}>
                {!currentDay.timerUsageTime
                  ? 'Нет данных'
                  : (
                    <>
                      Вы работали над задачами в течение
                      <span className={classes.timeText}> {getHumanTimeInterval(currentDay.timerUsageTime)}</span>
                    </>)}
              </Typography>
            </Grid>

            <Grid item xs={5} sm={12} className={classes.tomatoSummary}>
              {
                !currentDay.pomodoroCount
                  ? <HappyTomato className={classes.happyTomatoIcon} />
                  : <>
                    <Typography paragraph className={classes.tomatoCountWrap}>
                      <Tomato className={classes.tomatoCountIcon} />
                      <span className={classes.tomatoCountDesk}>&nbsp;x&nbsp;</span>
                      <span className={classes.tomatoCountDesk}>{currentDay.pomodoroCount}</span>
                    </Typography>

                    <Typography paragraph className={classes.tomatoCountBar}>
                      {currentDay.pomodoroCount + ' ' + declOfNum(
                        currentDay.pomodoroCount, ['помидор', 'помидара', 'помидоров']
                      )}
                    </Typography>
                  </>
              }
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Paper className={classes.paperGraph}>
            <VictoryChart
              domainPadding={{x: [17, 17], y: 10}}
              theme={ VictoryTheme.material }
              height={200}
              padding={{top: 0, bottom: 25, left: 5, right: 45}}
              style={{
                background: { fill: theme.palette.graph.footerBar }
              }}
              backgroundComponent={<Background y={175} height={60} x={-2} width={400} />}
            >
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6, 7]}
                tickFormat={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
                style={axisStyle(currentWeek, theme, currentDay)}
              />

              <VictoryAxis
                dependentAxis
                tickFormat={x => getTimeLabelForAxe(x)}
                offsetX={360}
                padding={{ top: 10, bottom: 10, left: 10, right: -10 }}
                style={axisAxeStyle(theme)}
                animate={{
                  easing: 'linear',
                  duration: 500,
                  onLoad: { duration: 500 }
                }}
              />

              <VictoryBar
                data={currentWeek}
                x='numberOfDay'
                y='timerUsageTime'
                style={{
                  data: {
                    fill: ({ datum }) => datum.numberOfDay === currentDay.numberOfDay
                      ? theme.palette.graph.barHover
                      : theme.palette.graph.bar,
                  },
                }}
                animate={{
                  easing: 'linear',
                  duration: 500,
                  onLoad: { duration: 500 }
                }}
                barWidth={35}
                events={[{
                  target: 'data',
                  eventHandlers: {
                    onClick: (target) => {
                      return [{
                        mutation: props => {
                          setCurrentDay(props.datum);
                          return {
                            style: {
                              fill: theme.palette.graph.barHover,
                              cursor: 'pointer',
                            }
                          };
                        }
                      }];
                    },
                    onMouseOver: () => {
                      return [{
                        mutation: () => {
                          return {
                            style: {
                              fill: theme.palette.graph.barHover,
                              cursor: 'pointer',
                            }
                          };
                        }
                      }];
                    },
                    onMouseLeave: () => {
                      return [{
                        mutation: () => {
                          return {
                            fill: ({ datum }) => datum.numberOfDay !== currentDay.numberOfDay
                              ? theme.palette.graph.barHover
                              : theme.palette.graph.bar,
                          };
                        }
                      }];
                    },
                  }
                }]}
              />
            </VictoryChart>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Grid
                  container
                  className={classes.infoBlock}
                  style={{
                    backgroundColor: !currentDay.finishedTomatoesTime
                      ? theme.palette.statistics.emptyLight
                      : theme.palette.statistics.focusLight,
                  }}
                >
                  <Grid item xs={7} className={classes.blockDesk}>
                    <Typography variant='h2' className={classes.blockHeading}>Фокус</Typography>
                    <Typography paragraph className={classes.blockValue} >
                      {`${Math.floor(
                        currentDay.timerUsageTime > 0
                        ? currentDay.finishedTomatoesTime / currentDay.timerUsageTime * 100
                        : 0
                      )}%` }
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className={classes.blockIconWrap}>
                    <FlareRoundedIcon
                      className={classes.focusIcon}
                      style={{
                        color:!currentDay.finishedTomatoesTime
                          ? theme.palette.statistics.emptyDark
                          : theme.palette.statistics.focusDark,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid
                  container
                  className={classes.infoBlock}
                  style={{
                    backgroundColor: !currentDay.pauseTime
                      ? theme.palette.statistics.emptyLight
                      : theme.palette.statistics.pauseLight,
                  }}
                >
                  <Grid item xs={7} className={classes.blockDesk}>
                    <Typography variant='h2' className={classes.blockHeading}>Время на паузе</Typography>
                    <Typography paragraph className={classes.blockValue}>
                      {getTimeLabelForPause(currentDay.pauseTime)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className={classes.blockIconWrap}>
                    <ScheduleIcon
                      className={classes.focusIcon}
                      style={{
                        color: !currentDay.pauseTime
                          ? theme.palette.statistics.emptyDark
                          : theme.palette.statistics.pauseDark,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid
                  container
                  className={classes.infoBlock}
                  style={{
                    backgroundColor: !currentDay.stopCount
                      ? theme.palette.statistics.emptyLight
                      : theme.palette.statistics.stopLight,
                  }}
                >
                <Grid item xs={7} className={classes.blockDesk}>
                  <Typography variant='h2' className={classes.blockHeading}>Остановки</Typography>
                  <Typography paragraph className={classes.blockValue}>
                    {currentDay.stopCount}
                  </Typography>
                </Grid>
                  <Grid item xs={5} className={classes.blockIconWrap}>
                    <BlockRoundedIcon
                      className={classes.focusIcon}
                      style={{
                        color: !currentDay.stopCount
                          ? theme.palette.statistics.emptyDark
                          : theme.palette.statistics.stopDark
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}

export default withTitleUpdate(StatisticsPage, 'Статистика');
