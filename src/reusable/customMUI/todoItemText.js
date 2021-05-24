import { withStyles, ListItemText } from '@material-ui/core';

export const TodoItemText = withStyles(theme => ({
  secondary: {
    color: theme.palette.input.text,
  },
}))(ListItemText);
