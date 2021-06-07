import {
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import { capitalizeFirstLetter } from '../../common/utils/formatUtils';
import { ToDoFormControl, ToDoInput, ToDoLabel } from '../../reusable/customMUI/customInput';
import { validateNumber, validateText } from '../../common/utils/valitatorUtils';
import React, { useContext, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import SaveIcon from '@material-ui/icons/Save';
import { AppModalContext } from '../../reusable/components/Modal/AppModalProvider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AppThemeContext } from '../../common/theme/AppThemeProvider';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { MessageSwitch } from '../../reusable/customMUI/customSwitch';
import tomato from '../../assets/img/tomato.svg';
import useSettingPageStyles from './settingPageStyles';
import modalVariants from '../../reusable/components/Modal/modalVariants';


function SettingPage() {
  const classes = useSettingPageStyles();
  const { isModalOpen, modalProps, setModalProps, setModalOpen } = useContext(AppModalContext);
  const { currentThemeName, setCurrentThemeName } = useContext(AppThemeContext);
  const isDarkTheme = currentThemeName === 'darkTheme';

  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const [errors, setErrors] = useState({});
  const [fieldTouched, setFieldTouched] = useState({});
  const [isSendMessages, setIsSendMessages] = useState(reactLocalStorage.get('isSendMessages') === 'true');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(null);

  const handleChangeSetting = (value, key, validation, min = 1, max = 50) => {
    setSettings({ ...settings, [key]: value });
    if (validation) {
      setErrors({ ...errors, [key]: validation(value, min, max) });
    }
  };

  function handleTouched(ev, key) {
    ev.preventDefault();
    setFieldTouched({ ...fieldTouched, [key]: true });
  }

  function saveChanges(ev) {
    ev.preventDefault();
    setCategoryError(null);
    let modalProps = modalVariants.errorBySettings;

    if (Object.values(errors).reduce((sum, item) => sum + item, 0) <= 0 || !Object.keys(errors).length) {
      reactLocalStorage.setObject('settings', settings);
      modalProps = modalVariants.successBySettings;
    }
    setModalOpen(!isModalOpen);
    setModalProps(modalProps);
  }

  function handleCategoryChange(value, isRequired = false) {
    setCategory(capitalizeFirstLetter(value));
    setCategoryError(validateText(value, 5, 30, isRequired));
  }

  const addCategory = ev => {
    ev.preventDefault();
    if (categoryError < 0) {
      const currentList = settings.categories;
      currentList.push(category);
      setSettings({ ...settings, categories: currentList });
      saveChanges(ev);
      setCategory('');
    } else {
      handleTouched(ev, 'categories');
      handleCategoryChange(category, true);
    }
  };

  function deleteCategory(ev, value) {
    ev.preventDefault();
    const currentList = settings.categories.filter(item => item !== value);
    setSettings({ ...settings, categories: currentList });
    saveChanges(ev);
    setCategory('');
  }

  const handleThemeChange = ev => {
    const choice = ev.target.checked;
    if (choice) {
      setCurrentThemeName('darkTheme');
    } else {
      setCurrentThemeName('lightTheme');
    }
  };

  const handleIsSendMessagesChange = ev => {
    setIsSendMessages(ev.target.checked);
    reactLocalStorage.set('isSendMessages', ev.target.checked);
  };

  const numericalSettings = [
    {
      label: 't помидора, мин',
      value: settings.durationOfPomodoro,
      key: 'durationOfPomodoro',
      error: errors.durationOfPomodoro,
      touched: fieldTouched.durationOfPomodoro,
    },
    {
      label: 'пауза короткая, мин',
      value: settings.durationOfShotPause,
      key: 'durationOfShotPause',
      error: errors.durationOfShotPause,
      touched: fieldTouched.durationOfShotPause,
    },
    {
      label: 'частота пауз',
      value: settings.frequencyOfLongPauses,
      key: 'frequencyOfLongPauses',
      error: errors.frequencyOfLongPauses,
      touched: fieldTouched.frequencyOfLongPauses,
    },
    {
      label: 'пауза длинная, мин',
      value: settings.durationOfLongPause,
      key: 'durationOfLongPause',
      error: errors.durationOfLongPause,
      touched: fieldTouched.durationOfLongPause,
    },
  ];

  return (
    <section className='container flex-column'>
      <Typography variant='h1' color='secondary' className='heading'>
        Настрой свое приложение и вперед!
      </Typography>
      <Divider className='mb-30'/>

      <form onSubmit={(ev)=> saveChanges(ev)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <ToDoFormControl className={classes.settingInput}>
                  <ToDoLabel variant='filled'>Ваше имя</ToDoLabel>
                  <ToDoInput
                    type='text'
                    disableUnderline={true}
                    value={settings.userName}
                    onChange={
                      ev => handleChangeSetting(
                        capitalizeFirstLetter(ev.target.value), 'userName', validateText, 3, 15
                      )}
                    onBlur={ev => handleTouched(ev, 'userName')}
                  />
                  {
                    (errors.userName !== -1 && fieldTouched.userName) &&
                    <FormHelperText className={classes.errorText}>{errors.userName}</FormHelperText>
                  }
                </ToDoFormControl>
              </Grid>
              <Grid item xs={2} className={classes.btnGrid}>
                <IconButton
                  aria-label='сохранить данные'
                  variant='contained'
                  type='submit'
                >
                  <SaveIcon className={classes.saveBtn}/>
                </IconButton>
              </Grid>

              <Grid item xs={10}>
                <ToDoFormControl className={classes.settingInput}>
                  <ToDoLabel variant='filled'>Новая категория</ToDoLabel>
                  <ToDoInput
                    type='text'
                    disableUnderline={true}
                    value={category}
                    onChange={ev => handleCategoryChange(ev.target.value)}
                    onBlur={ev => handleTouched(ev, 'categories')}
                  />
                  {
                    (categoryError !== -1 && fieldTouched.categories) &&
                    <FormHelperText className={classes.errorText}>{categoryError}</FormHelperText>
                  }
                </ToDoFormControl>
              </Grid>

              <Grid item xs={2} className={classes.btnGrid}>
                <IconButton
                  aria-label='добавить категорию'
                  variant='contained'
                  type='button'
                  onClick={addCategory}
                >
                  <AddCircleOutlineIcon className={classes.saveBtn}/>
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph style={{ margin: '0' }}>Категории в твоем списке:</Typography>
              </Grid>
              <List>
                {
                  settings.categories.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon style={{ minWidth: '2rem' }}>
                        <span className='list__item__img' style={{ backgroundImage: `url(${tomato})` }}/>
                      </ListItemIcon>
                      <ListItemText primary={item}/>
                      <IconButton
                        aria-label='удалить'
                        variant='contained'
                        type='button'
                        onClick={(ev) => deleteCategory(ev, item)}
                      >
                        <DeleteForeverIcon className={classes.saveBtn}/>
                      </IconButton>
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {
                numericalSettings.map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={9} sm={4}>
                      <ToDoFormControl className={classes.settingInput}>
                        <ToDoLabel variant='filled'>{item.label}</ToDoLabel>
                        <ToDoInput
                          type='number'
                          disableUnderline={true}
                          value={item.value}
                          onChange={
                            ev => handleChangeSetting(ev.target.value, item.key, validateNumber)}
                          onBlur={ev => handleTouched(ev, item.key)}
                        />
                        {
                          (item.error !== -1 && item.touched) &&
                          <FormHelperText className={classes.errorText}>{item.error}</FormHelperText>
                        }
                      </ToDoFormControl>
                    </Grid>

                    <Grid item xs={3} sm={2} className={classes.btnGrid}>
                      <IconButton
                        aria-label='сохранить данные'
                        variant='contained'
                        type='submit'
                      >
                        <SaveIcon className={classes.saveBtn}/>
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                ))
              }

              <Grid item xs={6} sm={5}>
                <FormControlLabel
                  control={
                    <MessageSwitch
                      style={{ height: '38px' }}
                      checked={isSendMessages}
                      onChange={handleIsSendMessagesChange}
                      icon={<NotificationsOffIcon style={{ color: '#B7280F' }} />}
                      checkedIcon={<NotificationsActiveIcon style={{ color: '#7ecb20' }} />}
                    />
                  }
                  label={isSendMessages? 'Отключить оповещения' : 'Включить оповещения'}
                />
              </Grid>

              <Grid item xs={6} sm={5}>
                <FormControlLabel
                  control={
                    <Switch
                      style={{ height: '38px' }}
                      checked={isDarkTheme}
                      onChange={handleThemeChange}
                      icon={<Brightness5Icon style={{ color: '#f8e000' }} />}
                      checkedIcon={<Brightness4Icon style={{ color: '#ff6d00' }} />}
                    />
                  }
                  label={isDarkTheme? 'Светлая тема' : 'Темная тема'}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </section>
  );
}

export default withTitleUpdate(SettingPage, 'Настройки');
