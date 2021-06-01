import {
  Divider, FormHelperText, Grid, makeStyles, MenuItem, Paper,
  Typography, useTheme
} from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import { useEffect, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { capitalizeFirstLetter, getNameOfDaysPeriod, getTimeLabelForAxe } from '../../common/utils/formatUtils';
import { ToDoFormControl } from '../../reusable/customMUI/customInput';
import { ToDoSelect, ToDoSelectInput, ToDoSelectLabel } from '../../reusable/customMUI/customSelect';
import { validateText } from '../../common/utils/valitatorUtils';
import ScheduleIcon from '@material-ui/icons/Schedule'; // часы
import BlockRoundedIcon from '@material-ui/icons/BlockRounded'; // премя на паузе
import FlareRoundedIcon from '@material-ui/icons/FlareRounded'; // почти фокус
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from 'react-vis';
import Button from '@material-ui/core/Button';
import BarSeries from 'react-vis/es/plot/series/bar-series';
import { Background, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';




const useStyles = makeStyles(theme => ({
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




  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: theme.palette.input.main,
    borderRadius: 0,
    // height: '100%',
  },
  graph: {
    // order: 0,
    // display: 'flex',
    // height: '100%',
//     font-size: 1.2rem;
// font-weight: 600;
  },
}));

function StatisticsPage() {
  const theme = useTheme();
  const myData = [
    { numberOfDay: 1, timerUsageTime: 50 },
    { numberOfDay: 2, timerUsageTime: 99 },
    { numberOfDay: 3, timerUsageTime: 150 },
    { numberOfDay: 4, timerUsageTime: 10 },
    { numberOfDay: 5, timerUsageTime: 210 },
    { numberOfDay: 6, timerUsageTime: 45 },
    { numberOfDay: 7, timerUsageTime: 90 },
  ];

  const victoryBarStyle = {
    data: {
      fill: theme.palette.graph.bar,
    }
  };

  // const victoryBarHoverStyle = {
  //   data: {
  //     fill: theme.palette.graph.barHover,
  //   }
  // };

  // const graphStyle = {
  //   histogram: {
  //     style: {
  //       fill: 'red',
  //     }
  //   }
  // }

  // const labelData = greenData.map((d, idx) => ({
  //   x: d.x,
  //   y: Math.max(greenData[idx].y, blueData[idx].y)
  // }));
  const weeks = ['Эта неделя', 'Прошедшая неделя', '2 недели назад'];

  const classes = useStyles();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const [currentWeek, setCurrentWeek] = useState(weeks[0]);
  // const [currentStyle, setCurrentStyle] = useState('')
  useEffect(()=>{
    console.log(classes);
    console.log(VictoryTheme.material)
  },[])

  return (
    <section className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        {capitalizeFirstLetter(settings.userName)}, твой прогресс в цифрах!
      </Typography>
      <Divider className='mb-30'/>

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
                  value={currentWeek}
                  onChange={ev => setCurrentWeek(ev.target.value)}
                >
                  {
                    weeks.map((item, index) => (
                      <MenuItem className={classes.selectOptions} value={item} key={index}>{item}</MenuItem>
                    ))
                  }
                </ToDoSelect>
              </ToDoFormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={12}>
              <Paper className={classes.paper}>Активность</Paper>
            </Grid>

            <Grid item xs={6} sm={12}>
              <Paper className={classes.paper}>Помидоры</Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} className={classes.graph}>
          <Paper className={classes.paper}>
            {/*ГРАФИК*/}
            {/*<div>*/}
            {/*  <XYPlot*/}
            {/*    xType="ordinal"*/}
            {/*    width={300}*/}
            {/*    height={300}*/}
            {/*    xDistance={100}*/}
            {/*  >*/}
            {/*    <VerticalGridLines style={{ stroke: 'red' }} />*/}
            {/*    <HorizontalGridLines style={{ stroke: 'red' }} />*/}
            {/*    <XAxis style={{ stroke: 'blue' }} />*/}
            {/*    <YAxis style={{ stroke: 'blue' }} />*/}
            {/*    <VerticalBarSeries*/}
            {/*      data={ myData }*/}
            {/*      color='red'*/}
            {/*      // onSeriesClick={(event)=>{*/}
            {/*      // console.log(event.target)*/}
            {/*      // }}*/}
            {/*      onValueClick={datapoint => {*/}
            {/*        console.log(datapoint)*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    /!*<BarSeries data={greenData} />*!/*/}
            {/*    /!*<BarSeries data={blueData} />*!/*/}
            {/*    /!*<LabelSeries data={labelData} getLabel={d => d.x} />*!/*/}
            {/*  </XYPlot>*/}
            {/*</div>*/}

            {/*<div>*/}
              <VictoryChart
                domainPadding={{x: [18, 18], y: 10}}
                theme={ VictoryTheme.material }
                height={200}
                padding={{top: 0, bottom: 25, left: 5, right: 45}}
                style={{
                  background: { fill: theme.palette.graph.footerBar }
                }}
                backgroundComponent={<Background y={175} height={60} x={-2} width={400}/>}
              >
                <VictoryAxis
                  tickValues={[1, 2, 3, 4, 5, 6, 7]}
                  // tickValues={[1, 2, 3, 4]}
                  tickFormat={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
                  // padding={{ top: 10, bottom: 10, left: 10, right: -10 }}
                  style={{
                    axis: {stroke: 'inherit'},
                    grid: {stroke: 'inherit' },
                    ticks: {stroke: 'inherit'},
                    tickLabels: {fontSize: 9, padding: 0, fill: theme.palette.text.primary}
                  }}
                />

                <VictoryAxis
                  // invertAxis={true}
                  dependentAxis
                  tickFormat={x => getTimeLabelForAxe(x)}
                  offsetX={360}
                  padding={{ top: 10, bottom: 10, left: 10, right: -10 }}
                  style={{
                    axis: {stroke: 'inherit'},
                    grid: {stroke: theme.palette.graph.grid, strokeDasharray: 0 },
                    ticks: {stroke: 'inherit', size: 8},
                    tickLabels: {fontSize: 8, padding: 5, fill: theme.palette.text.primary}
                  }}
                />

                <VictoryBar
                  data={myData}
                  x='numberOfDay'
                  y='timerUsageTime'
                  style={victoryBarStyle}
                  // height={250}
                  animate={{
                    duration: 1500,
                    onLoad: { duration: 800 }
                  }}
                  barRatio={1.1}
                  events={[{
                    target: "data",
                    eventHandlers: {
                      onClick: (target) => {
                        return [
                          {
                            mutation: (props) => {
                              console.log(props.datum)
                              const fill = props.style && props.style.fill;
                              return fill === "black" ? null : { style: { fill:  theme.palette.graph.footerBar } };
                            }
                          }
                        ];
                      },
                      onMouseOver: () => {
                        return [
                          {
                            mutation: (props) => {
                              console.log(props)
                              return { style: { fill: theme.palette.graph.barHover } };
                            }
                          }
                        ];
                      },
                      onMouseLeave: () => {
                        return [
                          {
                            mutation: () => {
                              return { style: { fill: theme.palette.graph.bar } };
                            }
                          }
                        ];
                      },
                    }
                  }]}
                />
              </VictoryChart>
            {/*</div>*/}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <span>Фокус</span>
            <span>35%</span>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <span>Время на паузе</span>
            <span>9м</span>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <span>Остановки</span>
            <span>3</span>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
}

export default withTitleUpdate(StatisticsPage, 'Статистика');
