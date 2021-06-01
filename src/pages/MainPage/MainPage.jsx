import './mainPage.scss';
import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import { capitalizeFirstLetter, getNameOfDaysPeriod } from '../../common/utils/formatUtils';
import { TodoList } from '../../reusable/components/TodoList/TodoList';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useState } from 'react';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage() {
  const classes = useStyles();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));

  return (
    <section className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        Привет, {capitalizeFirstLetter(settings.userName)}!&ensp;
        {getNameOfDaysPeriod()}, чтобы поработать!
      </Typography>

      <Divider className='mb-30'/>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TodoList />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </section>
  );
}

export default withTitleUpdate(MainPage, 'Главная');
