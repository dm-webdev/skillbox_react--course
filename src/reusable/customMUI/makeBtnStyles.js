import { makeStyles } from '@material-ui/core';


const makeBtnStyles = makeStyles(theme => ({
  primaryBtn: {
    alignSelf: 'flex-start',
    padding: '0.8rem 2rem',
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '1rem',
    background: theme.palette.primaryBtn.main,
    color: theme.palette.primaryBtn.text,

    '&:hover': {
      backgroundColor: theme.palette.primaryBtn.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.primaryBtn.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.primaryBtn.hover,
    },
  }
}));

export default makeBtnStyles;
