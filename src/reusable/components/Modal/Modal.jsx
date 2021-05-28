import React, { useContext, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DialogContentText, FormHelperText, makeStyles, TextField } from '@material-ui/core';
import { ToDoFormControl, ToDoInput, ToDoLabel } from '../../customMUI/customInput';
import { validateText } from '../../../common/utils/valitatorUtils';
import { AppModalContext } from './AppModalProvider';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import { red } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';


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
}));


export function Modal() {
  const classes = ModalStyles();
  const btnClasses = makeBtnStyles();

  const { isModalOpen, modalProps, setModalProps, setModalOpen } = useContext(AppModalContext);
  const [currentProps, setCurrentProps] = useState({});

  const handleClose = () => {
    setModalOpen(false);
    setModalProps({});
  };

  useEffect(() => {
    if (Object.keys(modalProps).length) {
      setCurrentProps(modalProps)
    }
  });

  // useEffect(() => {
  //   let close;
  //   if (isModalOpen && modalProps?.needClose) {
  //     close = setTimeout (() => {
  //       handleClose(new Date());
  //     }, 4000);
  //   }
  //   return () => {
  //     clearInterval(close);
  //   };
  // }, [isModalOpen])

  function getModalFragment(type) {
    switch (type) {
      case 'success':
      case 'error':
        return (
          <>
            <MuiDialogTitle disableTypography className={classes.headerBar}>
              <Typography variant="h2" className={classes.heading}>{ currentProps.title }</Typography>

              <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent className={classes.content}>
              <DialogContentText className={classes.contentText}>{ currentProps.description }</DialogContentText>
              <IconButton
                aria-label="закрыть окно"
                variant="contained"
                type="button"
                onClick={handleClose}
              >
                {type === 'success' && (<CheckCircleOutlineIcon className={classes.okBtn}/>)}
                {type === 'error' && (<WarningIcon className={classes.errorBtn}/>)}
              </IconButton>
            </MuiDialogContent>
          </>
        )
      case 'delete':
        return (
          <>
            <MuiDialogTitle disableTypography className={classes.headerBar}>
              <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent className={classes.content}>
              <Typography
                variant="h2"
                className={classes.heading}
                classes={{ root: classes.deleteHeading }}
              >
                { currentProps.title }
              </Typography>
                <Button
                  variant='contained'
                  className={btnClasses.secondaryBtn}
                  classes={{ root: classes.deleteBtn }}
                  type='button'
                  onClick={() => {
                    currentProps.removeTask(currentProps.id);
                    handleClose();
                  }}
                >
                  Удалить
                </Button>

                <Button onClick={handleClose} color="secondary" className={btnClasses.underlinedBtn}>
                  Отмена
                </Button>
            </MuiDialogContent>
          </>
        )
      // case 'error':
      //   return (
      //     <>
      //       <MuiDialogTitle disableTypography className={classes.headerBar}>
      //         <Typography variant="h2" className={classes.heading}>{ currentProps.title }</Typography>
      //
      //         <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
      //           <CloseIcon />
      //         </IconButton>
      //       </MuiDialogTitle>
      //       <DialogContent className={classes.content}>
      //         <DialogContentText className={classes.contentText}>{ currentProps.description }</DialogContentText>
      //         <IconButton
      //           aria-label='закрыть окно'
      //           variant='contained'
      //           type='button'
      //           onClick={handleClose}
      //           className={classes.okBtn}
      //         >
      //           <WarningIcon className={classes.errorBtn}/>
      //         </IconButton>
      //       </DialogContent>
      //     </>
      //   )
      // case 'Ban sms sending by ip':
      // case 'Ban by client timeout':
      //   return (
      //     <>
      //       <span className='simple-error modal-text'>Вы не можете отправлять код еще</span>
      //       <span className='simple-error modal-text mb-60'>{getHumanTimeToUnlock(+errorResponse?.timeout)}</span>
      //     </>
      //   )
      // case 'Phone code sending error':
      // case 'Invalid phone':
      //   return (
      //     <>
      //       <span className='simple-error modal-text'>Ошибка! Пример правильного номера</span>
      //       <span className='simple-error modal-text mb-60'>9211231212</span>
      //     </>
      //   )
      default:
        return (
          <span className='simple-error modal-text mb-60'>Ошибка! Что-то пошло не так, повторите попытку позднее!</span>
        );
    }
  }

  if (!modalProps?.type) {
    return null;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={isModalOpen}
        classes={{ paper: classes.root }}
      >
        {getModalFragment(modalProps.type)}
        {/*<MuiDialogTitle disableTypography className={classes.headerBar}>*/}
        {/*  <Typography variant="h2" className={classes.heading}>{ currentProps.title }</Typography>*/}

        {/*  <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>*/}
        {/*    <CloseIcon />*/}
        {/*  </IconButton>*/}
        {/*</MuiDialogTitle>*/}

        {/*<DialogContent className={classes.content}>*/}
        {/*  <Typography gutterBottom>*/}
        {/*    { currentProps.description }*/}

        {/*  </Typography>*/}

          {/*<DialogContentText className={classes.contentText}>{ currentProps.description }</DialogContentText>*/}
          {/*<IconButton*/}
          {/*  aria-label='закрыть окно'*/}
          {/*  variant='contained'*/}
          {/*  type='button'*/}
          {/*  onClick={handleClose}*/}
          {/*  className={classes.okBtn}*/}
          {/*>*/}
          {/*  <CheckCircleOutlineIcon className={classes.okBtn}/>*/}
          {/*</IconButton>*/}

        {/*  <ToDoFormControl>*/}
        {/*    <ToDoLabel htmlFor='todoInput' variant='filled'>Название задачи</ToDoLabel>*/}
        {/*    <ToDoInput*/}
        {/*      id='todoInput'*/}
        {/*      aria-describedby='Введите название задачи'*/}
        {/*      type='text'*/}
        {/*      disableUnderline={true}*/}
        {/*      // value={newTask.title || ''}*/}
        {/*      // onChange={(ev) => handleChangeInput(ev, 'title', validateText)}*/}
        {/*      // onBlur={(ev) => handleTouched(ev, 'title')}*/}
        {/*    />*/}
        {/*    /!*{*!/*/}
        {/*    /!*  formErrors.title && formTouched.title &&*!/*/}
        {/*    /!*  <FormHelperText className={classes.errorText}>{formErrors.title}</FormHelperText>*!/*/}
        {/*    /!*}*!/*/}
        {/*  </ToDoFormControl>*/}

        {/*</DialogContent>*/}
        {/*<MuiDialogActions classes={{ root: classes.footerBar }}>*/}
          {/*<Button onClick={handleClose} color="secondary">*/}
          {/*  Cancel*/}
          {/*</Button>*/}

        {/*  <Button onClick={handleClose} color="secondary" className={btnClasses.underlinedBtn}>*/}
        {/*    Отмена*/}
        {/*  </Button>*/}

          {/*<Button variant='contained' className={btnClasses.secondaryBtn} type='submit'>*/}
          {/*  Удалить*/}
          {/*</Button>*/}

          {/*<Button variant='contained' className={btnClasses.primaryBtn} type='submit'>*/}
          {/*  Добавить*/}
          {/*</Button>*/}
        {/*  <IconButton*/}
        {/*    aria-label='закрыть окно'*/}
        {/*    variant='contained'*/}
        {/*    type='button'*/}
        {/*    onClick={handleClose}*/}
        {/*    className={classes.okBtn}*/}
        {/*  >*/}
        {/*    <CheckCircleOutlineIcon className={classes.okBtn}/>*/}
        {/*  </IconButton>*/}
        {/*</MuiDialogActions>*/}
      </Dialog>
    </div>
  );
}
