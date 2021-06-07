import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DialogContentText, FormHelperText } from '@material-ui/core';
import { ToDoFormControl, ToDoInput, ToDoLabel } from '../../customMUI/customInput';
import { validateText } from '../../../common/utils/valitatorUtils';
import { AppModalContext } from './AppModalProvider';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';
import ModalStyles from './modalStyles';


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
    let close;
    if (modalProps.needClose) {
      close = setTimeout(() => {
        handleClose();
      }, 3000);
    }
    return () => {
      clearInterval(close);
    };
  }, [modalProps]);

  // поле ввода
  const [taskTitle, setTaskTitle] = useState('');
  const [fieldTouched, setFieldTouched] = useState(false);
  const [fieldError, setFieldError] = useState('-1');
  const [showError, setShowError] = useState(false);

  const handleChangeField = ev => {
    ev.preventDefault();
    setShowError(false);
    setTaskTitle(ev.target.value);
    setFieldError(`${validateText(ev.target.value, 5, 50, true)}`);
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    if (fieldError === '-1') {
      currentProps.editTask(currentProps.id, taskTitle);
      handleClose();
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (Object.keys(modalProps).length) {
      setCurrentProps(modalProps);
    }
  }, [modalProps]);

  useEffect(() => {
    if (modalProps.type === 'edit') {
      setTaskTitle(currentProps?.itemTitle);
      setFieldTouched(false);
      setFieldError('-1');
      setShowError(false);
    }
  }, [currentProps])

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
      case 'edit':
        return (
          <>
            <MuiDialogTitle disableTypography className={classes.headerBar}>
              <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>

            <MuiDialogContent className={classes.form}>
              <Typography
                variant="h2"
                className={classes.heading}
                classes={{ root: classes.deleteHeading }}
              >
                { currentProps.title }
              </Typography>

              <form onSubmit={handleSubmit} className={classes.form}>
                <ToDoFormControl>
                  <ToDoLabel variant='filled'>{currentProps.description}</ToDoLabel>
                  <ToDoInput
                    type='text'
                    disableUnderline={true}
                    value={taskTitle}
                    onChange={handleChangeField}
                    onBlur={() => setFieldTouched(true)}
                  />
                  {
                    fieldError !== '-1' && fieldTouched &&
                    <FormHelperText className={classes.errorText}>{fieldError}</FormHelperText>
                  }
                </ToDoFormControl>

                {
                  showError && <Typography paragraph className={classes.errorMessage}>
                    Поле должно быть заполнено корректно!
                  </Typography>
                }
                <Button
                  variant='contained'
                  className={btnClasses.primaryBtn}
                  classes={{ root: classes.deleteBtn }}
                  type='submit'
                >
                  Сохранить
                </Button>

              </form>

              <Button onClick={handleClose} color="secondary" className={btnClasses.underlinedBtn}>
                Отмена
              </Button>
            </MuiDialogContent>
          </>
        )
      default:
        return (
          <span className='simple-error modal-text mb-60'>
            Ошибка! Что-то пошло не так, повторите попытку позднее!
          </span>
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
        { getModalFragment(modalProps.type) }
      </Dialog>
    </div>
  );
}
