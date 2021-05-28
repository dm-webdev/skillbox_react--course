import { makeStyles } from '@material-ui/core';


const useSettingPageStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '15px',
  },
  btnGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorText: {
    position: 'absolute',
    bottom: '-5px',
    padding: '3px 15px',
    color: theme.palette.errorText.main,
    fontWeight: '500',
  },
  settingInput: {
    marginBottom: 0,
  },
  saveBtn: {
    color: theme.palette.primaryBtn.main,
  },
}));

export default useSettingPageStyles;
