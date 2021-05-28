import { makeStyles } from '@material-ui/core';


const makeBtnStyles = makeStyles(theme => ({
  primaryBtn: {
    alignSelf: 'flex-start',
    padding: '1rem 2rem',
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
  },
  secondaryBtn: {
    alignSelf: 'flex-start',
    padding: '1rem 2rem',
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '1rem',
    background: theme.palette.secondaryBtn.main,
    color: theme.palette.secondaryBtn.text,

    '&:hover': {
      backgroundColor: theme.palette.secondaryBtn.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.secondaryBtn.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondaryBtn.hover,
    },
  },
  underlinedBtn: {
    color: theme.palette.text.primary,
  }
}));

export default makeBtnStyles;
