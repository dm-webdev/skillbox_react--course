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
    border: `2px solid ${theme.palette.primaryBtn.main}`,

    '&:hover': {
      backgroundColor: theme.palette.primaryBtn.hover,
      borderColor: theme.palette.primaryBtn.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.primaryBtn.hover,
      borderColor: theme.palette.primaryBtn.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.primaryBtn.hover,
      borderColor: theme.palette.primaryBtn.hover,
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
    border: `2px solid ${theme.palette.secondaryBtn.main}`,

    '&:hover': {
      backgroundColor: theme.palette.secondaryBtn.hover,
      borderColor: theme.palette.secondaryBtn.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.secondaryBtn.hover,
      borderColor: theme.palette.secondaryBtn.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondaryBtn.hover,
      borderColor: theme.palette.secondaryBtn.hover,
    },
  },

  helperBtn: {
    alignSelf: 'flex-start',
    padding: '1rem 2rem',
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '1rem',
    background: theme.palette.input.main,
    border: `2px solid ${theme.palette.secondaryBtn.main}`,
    color: theme.palette.secondaryBtn.main,
    '&:hover': {
      backgroundColor: theme.palette.secondaryBtn.hover,
      borderColor: theme.palette.secondaryBtn.hover,
      color: theme.palette.secondaryBtn.text,
    },
    '&:active': {
      backgroundColor: theme.palette.secondaryBtn.hover,
      borderColor: theme.palette.secondaryBtn.hover,
      color: theme.palette.secondaryBtn.text,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondaryBtn.hover,
      borderColor: theme.palette.secondaryBtn.hover,
      color: theme.palette.secondaryBtn.text,
    },
    '&:disabled': {
      backgroundColor: theme.palette.input.main,
      border: `2px solid ${theme.palette.dotedBtn.main}`,
      color: theme.palette.dotedBtn.main,
    }
  },

  underlinedBtn: {
    color: theme.palette.text.primary,
  }
}));

export default makeBtnStyles;
