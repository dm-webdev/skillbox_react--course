import { makeStyles } from '@material-ui/core';


const ModalStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
  },
  headerBar: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: '300px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  heading: {
    margin: 0,
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    minHeight: '100px',
    fontSize: '1.5rem',
  },
  contentText: {
    textAlign: 'center',
    fontSize: '1.3rem',
  },
  footerBar: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: theme.spacing(1),
  },
  okBtn: {
    color: theme.palette.primaryBtn.main,
    fontSize: '2.5rem',
  },
  errorBtn: {
    color: theme.palette.errorText.main,
    fontSize: '2.5rem',
  },
  deleteBtn: {
    alignSelf: 'center',
    marginBottom: '20px',
  },
  deleteHeading: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  errorText: {
    position: 'absolute',
    bottom: '-5px',
    padding: '3px 15px',
    color: theme.palette.errorText.main,
    fontWeight: '500',
  },
  errorMessage: {
    color: theme.palette.errorText.main,
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontSize: '1rem',
  }
}));

export default ModalStyles;
