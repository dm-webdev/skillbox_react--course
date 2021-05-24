import { FormControl, Input, InputLabel, withStyles } from '@material-ui/core';


export const ToDoInput = withStyles(theme => ({
  root: {
    padding: '5px 15px 0 15px',
  },
}))(Input);

export const ToDoLabel = withStyles(theme => ({
  root: {
    color: `${theme.palette.input.text}!important`,
  },
}))(InputLabel);

export const ToDoFormControl = withStyles(theme => ({
  root: {
    marginBottom: '25px',
    paddingBottom: '5px',
    width: '80%',
    border: 'none',
    boxShadow: 'none',
    backgroundColor: theme.palette.input.main,
  },
}))(FormControl);
