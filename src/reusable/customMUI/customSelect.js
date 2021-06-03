import { Input, InputLabel, Select, withStyles } from '@material-ui/core';


export const ToDoSelectInput = withStyles(theme => ({
  root: {
    padding: '5px 15px 0 15px',
  },
  focused: {
    backgroundColor: 'transparent',
  },
}))(Input);

export const ToDoSelect = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}))(Select);

export const ToDoSelectLabel = withStyles(theme => ({
  root: {
    color: `${theme.palette.input.text}!important`,
    padding: '0 15px',
  },
}))(InputLabel);


export const MenuSelectProps = {
  PaperProps: {
    style: {
      maxHeight: '150px',
    },
  },
};
