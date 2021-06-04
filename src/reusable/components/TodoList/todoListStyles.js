import { makeStyles } from '@material-ui/core';

const todoListStyles = makeStyles(theme => ({
  todoForm: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
  todoListDecoration: {
    marginRight: '10px',
    minWidth: '25px',
    height: '25px',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.dotedBtn.main}`,
    textAlign: 'center',
    lineHeight: '1.5',
  },
  todoListDecorationDone: {
    marginRight: '10px',
    minWidth: '25px',
    height: '25px',
  },
  dotedBtn: {
    color: theme.palette.dotedBtn.main,
  },
  popoverBtn: {
    color: theme.palette.primaryBtn.main,
    fontSize: '1.3rem'
  },
  popoverBtnDesk: {
    color: theme.palette.dotedBtn.text,
  },
  todoListCounter: {
    color: theme.palette.input.text,
  },
  selectOptions: {
    color: theme.palette.input.text,
  },
  done: {
    color: theme.palette.primaryBtn.main,
    minWidth: '2rem'
  },
  errorText: {
    position: 'absolute',
    bottom: '-5px',
    padding: '3px 15px',
    color: theme.palette.errorText.main,
    fontWeight: '500',
  },


}));

export default todoListStyles;
