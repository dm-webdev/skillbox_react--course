import {
  AccordionDetails,
  Button,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@material-ui/core';
import tomato from '../../../assets/img/tomato.svg';
import { ToDoFormControl, ToDoInput, ToDoLabel } from '../../customMUI/customInput';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary } from '../../customMUI/customAccordion';
import { useEffect, useState } from 'react';
import { TodoItemText } from '../../customMUI/todoItemText';
import { MenuSelectProps, ToDoSelect, ToDoSelectInput, ToDoSelectLabel } from '../../customMUI/customSelect';
import instructionList from '../../../common/staticData/instructionList';
import todoListStyles from './todoListStyles';
import { nanoid } from 'nanoid';
import { reactLocalStorage } from 'reactjs-localstorage';
import { getAllTime } from '../../../common/utils/formatUtils';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { validateNumber, validateText } from '../../../common/utils/valitatorUtils';
import { TodoPopover } from './TodoPopover';
import { sortDict, sortDictAndRemove } from '../../../common/utils/taskHelpers';
import PropTypes from 'prop-types';


export function TodoList({ setCurrentTask }) {
  const classes = todoListStyles();
  const btnClasses = makeBtnStyles();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));

  // todoList
  const [todos, setTodos] = useState(reactLocalStorage.getObject('todos') || {});
  const [newTask, setNewTask] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChangeInput = (ev, key, validation, min = 5, max = 50) => {
    setNewTask({ ...newTask, [key]: ev.target.value });
    setFormErrors({ ...formErrors, [key]: validation(ev.target.value, min, max) });
  };

  function handleTouched(ev, key) {
    ev.preventDefault();
    setFormTouched({ ...formTouched, [key]: true });
  };

  const onSubmitTask = (ev) => {
    ev.preventDefault();
    const errors = {
      title: validateText(newTask?.title, 5, 50),
      category: validateText(newTask?.category, 5, 50),
      tomatoCount: validateNumber(newTask?.tomatoCount, 1, 15),
    };

    if (Object.values(errors).reduce((sum, item) => sum + item, 0) < 0) {
      const id = nanoid(10);
      const todosFromState = reactLocalStorage.getObject('todos');
      todosFromState[id] = {
        ...newTask,
        id,
        order: Object.keys(todosFromState).length + 1,
        done: false,
      };
      setTodos(todosFromState);
      reactLocalStorage.setObject('todos', todosFromState);
      setNewTask({});
      setFormTouched({});
    }
    setFormErrors(errors);
    setFormTouched({
      title: true,
      category: true,
      tomatoCount: true,
    });
  };

  // управление задачами

  function setTaskUp(id) {
    if (todos[id].order !== 1) {
      const sortedTasks = sortDict(reactLocalStorage.getObject('todos'));
      sortedTasks[Object.values(sortedTasks).find(item => item.order === sortedTasks[id].order - 1).id].order += 1;
      sortedTasks[id].order -= 1;
      setTodos(sortedTasks);
      reactLocalStorage.setObject('todos', sortedTasks);
    } else {
      console.log('это верхняя задача')
    }
  }

  function setTaskDown(id) {
    if (todos[id].order !== Object.keys(todos).length) {
      const sortedTasks = sortDict(reactLocalStorage.getObject('todos'));
      sortedTasks[Object.values(sortedTasks).find(item => item.order === sortedTasks[id].order + 1).id].order -= 1;
      sortedTasks[id].order += 1;
      setTodos(sortedTasks);
      reactLocalStorage.setObject('todos', sortedTasks);
    } else {
      console.log('это нижняя задача')
    }
  }

  function removeTask(id) {
    const sortedTasks = sortDictAndRemove(reactLocalStorage.getObject('todos'), id);
    setTodos(sortedTasks);
    reactLocalStorage.setObject('todos', sortedTasks);
  }

  function editTask(id, value) {
    const editedTaskList = reactLocalStorage.getObject('todos');
    editedTaskList[id].title = value;
    setTodos(editedTaskList);
    reactLocalStorage.setObject('todos', editedTaskList);
  }

  useEffect(() => {
    if (Object.keys(todos)?.length) {
      setCurrentTask(Object.values(todos).sort((a, b) => a.order - b.order)[0])
    }
  }, [todos])

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon color='secondary' />}>
          Ура! Теперь можно начать работать:
        </AccordionSummary>

        <AccordionDetails>
          <List>
            {
              instructionList.map((item, index) => (
                <ListItem key={index} style={{ padding: '0px 16px' }}>
                  <ListItemIcon style={{ minWidth: '2rem' }}>
                    <span className='list__item__img' style={{ backgroundImage: `url(${tomato})` }}/>
                  </ListItemIcon>

                  <ListItemText primary={item}/>
                </ListItem>
              ))
            }
          </List>
        </AccordionDetails>
      </Accordion>

      <form className={classes.todoForm} onSubmit={onSubmitTask}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={11}>
            <ToDoFormControl>
              <ToDoLabel variant='filled'>Название задачи</ToDoLabel>
              <ToDoInput
                type='text'
                disableUnderline={true}
                value={newTask.title || ''}
                onChange={(ev) => handleChangeInput(ev, 'title', validateText)}
                onBlur={(ev) => handleTouched(ev, 'title')}
              />
              {
                (formErrors.title !== -1  && formTouched.title) &&
                <FormHelperText className={classes.errorText}>{formErrors.title}</FormHelperText>
              }
            </ToDoFormControl>
          </Grid>

          <Grid item xs={12} sm={7}>
            <ToDoFormControl>
              <ToDoSelectLabel>Категория</ToDoSelectLabel>
              <ToDoSelect
                input={<ToDoSelectInput disableUnderline={true} />}
                value={newTask.category || ''}
                onChange={ev => handleChangeInput(ev, 'category', validateText)}
                onBlur={ev => handleTouched(ev, 'category')}
                MenuProps={MenuSelectProps}
              >
                {
                  settings.categories.map((item, index) => (
                    <MenuItem className={classes.selectOptions} value={item} key={index}>{item}</MenuItem>
                  ))
                }
              </ToDoSelect>
              {
                (formErrors.category !== -1  && formTouched.category) &&
                <FormHelperText className={classes.errorText}>{formErrors.category}</FormHelperText>
              }
            </ToDoFormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <ToDoFormControl>
              <ToDoLabel variant='filled'>Помидоры</ToDoLabel>
              <ToDoInput
                type='number'
                disableUnderline={true}
                value={newTask.tomatoCount || ''}
                onChange={(ev) => handleChangeInput(ev, 'tomatoCount', validateNumber, 1, 14)}
                onBlur={(ev) => handleTouched(ev, 'tomatoCount')}
              />
              {
                (formErrors.tomatoCount !== -1 && formTouched.tomatoCount) &&
                <FormHelperText className={classes.errorText}>{formErrors.tomatoCount}</FormHelperText>
              }
            </ToDoFormControl>
          </Grid>
        </Grid>

        <Button variant='contained' className={btnClasses.primaryBtn} type='submit'>
          Добавить
        </Button>
      </form>

      <List className={classes.todoList}>
        {
          !!Object.values(todos).length ?
            <>
              {Object.values(todos).sort((a, b) => a.order - b.order).map((item, index) => (
                <ListItem key={item.id}>
                  <ListItemIcon style={{minWidth: '2rem'}}>
                    <span className={classes.todoListDecoration}>{index + 1}</span>
                  </ListItemIcon>

                  <TodoItemText
                    primary={item.title}
                    secondary={`Категория: ${item.category}`}
                  />
                  {
                    item.done &&
                    <ListItemIcon>
                      <CheckCircleOutlineIcon className={classes.done}/>
                    </ListItemIcon>
                  }

                  <TodoPopover
                    item={item}
                    setTaskUp={setTaskUp}
                    setTaskDown={setTaskDown}
                    removeTask={removeTask}
                    editTask={editTask}
                  />

                </ListItem>
              ))}
              <ListItem>
                <TodoItemText
                  primary={`Количество помидор: ${Object.values(todos).reduce((sum, current) => sum + +current.tomatoCount, 0)} шт`}
                  secondary={`Потребуется: ${getAllTime(todos, settings.durationOfPomodoro)}`}
                />
              </ListItem>
            </> :
            <ListItem>
              <TodoItemText
                primary='У вас нет задач! Если возникли вопросы, воспользуйтесь инструкцией.'
              />
            </ListItem>
          }
      </List>
    </>
  );
}

TodoList.propTypes = {
  // currentTask: PropTypes.array,
  setCurrentTask: PropTypes.func.isRequired,
  // setTaskDown: PropTypes.func.isRequired,
  // removeTask: PropTypes.func.isRequired,
  // editTask: PropTypes.func.isRequired,
}
