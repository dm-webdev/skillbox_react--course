import './mainPage.scss';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import { getNameOfDaysPeriod } from '../../common/utils/formatUtils';
import { TodoList } from '../../reusable/components/TodoList/TodoList';
//TODO перенести store
import store from './../../data/staticStore';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage() {
  const classes = useStyles();

  return (
    <div className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        Привет, { store.settings.userName }!&ensp;
        {getNameOfDaysPeriod()}, чтобы поработать!
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TodoList />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withTitleUpdate(MainPage, 'Главная');
