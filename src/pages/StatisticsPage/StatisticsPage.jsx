import {
  Divider, Grid, makeStyles, Paper,
  Typography
} from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { capitalizeFirstLetter, getNameOfDaysPeriod } from '../../common/utils/formatUtils';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function StatisticsPage() {
  const classes = useStyles();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));

  return (
    <div className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        {capitalizeFirstLetter(settings.userName)}, твоя статистика работы по методу «Помодоро»!
      </Typography>

      <Divider className='mb-30'/>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withTitleUpdate(StatisticsPage, 'Статистика');
