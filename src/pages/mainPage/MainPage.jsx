import './mainPage.scss';
import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import { capitalizeFirstLetter, getNameOfDaysPeriod } from '../../common/utils/formatUtils';
import { TodoList } from '../../reusable/components/TodoList/TodoList';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useState } from 'react';
import { PomodoroTimer } from '../../reusable/components/PomodoroTimer/PomodoroTimer';


function MainPage() {
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const [currentTask, setCurrentTask] = useState({})

  return (
    <section className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        Привет, {capitalizeFirstLetter(settings.userName)}!&ensp;
        {getNameOfDaysPeriod()}, чтобы поработать!
      </Typography>

      <Divider className='mb-30'/>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TodoList setCurrentTask={setCurrentTask} />
        </Grid>

        <Grid item xs={12} md={6}>
          <PomodoroTimer currentTask={currentTask} />
        </Grid>
      </Grid>
    </section>
  );
}

export default withTitleUpdate(MainPage, 'Главная');
