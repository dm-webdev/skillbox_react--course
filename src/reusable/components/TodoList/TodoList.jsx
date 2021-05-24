import './todoList.scss';
import {
  AccordionDetails, Button, Divider, IconButton, List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles, Popover, Typography
} from '@material-ui/core';
import tomato from '../../../assets/img/tomato.svg';
import { ToDoFormControl, ToDoInput, ToDoLabel } from '../../customMUI/customInput';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary } from '../../customMUI/customAccordion';
//TODO перенести store
import store from '../../../data/staticStore';
import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { TodoItemText } from '../../customMUI/todoItemText';


const Styles = makeStyles(theme => ({
  todoForm: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  todoListDecoration: {
    marginRight: '10px',
    minWidth: '25px',
    height: '25px',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.dotedBtn.main}`,
    textAlign: 'center',
    lineHeight: '1.5',
  },
  dotedBtn: {
    color: theme.palette.dotedBtn.main,
  },
  popoverBtn: {
    color: theme.palette.primaryBtn.main,
    fontSize: '1.3rem'
  },
  popoverBtnDesk: {
    color: theme.palette.dotedBtn.text,
  },
  todoListCounter: {
    color: theme.palette.input.text,
  },
}));

export function TodoList() {
  const classes = Styles();
  const btnClasses = makeBtnStyles()


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon color='secondary' />}>
          Ура! Теперь можно начать работать:
        </AccordionSummary>

        <AccordionDetails>
          <List>
            {
              ['Для создания задачи, выбирите категорию, напишите название задачи' +
              ' и задайте запланированное количество времени в «помидорах»',
                'Верхняя задача, является текущей',
                'Запустите таймер («помидор»)',
                'Работайте пока «помидор» не прозвонит',
                'Сделайте короткий перерыв (3-5 минут)',
                'Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. ' +
                'Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).',].map((item, index) => (
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

      <form className={classes.todoForm}>
        <ToDoFormControl>
          <ToDoLabel htmlFor='todoInput' variant='filled'>Название задачи</ToDoLabel>
          <ToDoInput id='todoInput' aria-describedby='Введите название задачи' type='text' disableUnderline={true}/>
        </ToDoFormControl>

        <Button variant='contained' className={btnClasses.primaryBtn}>
          Добавить
        </Button>
      </form>

      <List className={classes.todoList}>
        {
          store.todoList.map((item, index) => (
            <ListItem key={item.id} >
              <ListItemIcon style={{ minWidth: '2rem' }}>
                <span className={classes.todoListDecoration}>{ index + 1 }</span>
              </ListItemIcon>

              <TodoItemText primary={item.title} secondary={`Категория: ${item.category}`} />

              <IconButton aria-label="settings" aria-describedby={id} variant="contained" onClick={handleClick}>
                <MoreHorizIcon className={classes.dotedBtn} />
              </IconButton>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <List>
                  <ListItem button>
                    <ListItemIcon style={{ minWidth: '2.5rem' }}>{<AddCircleOutlineRoundedIcon className={classes.popoverBtn} />}</ListItemIcon>
                    <ListItemText primary='Увеличить' className={classes.popoverBtnDesk}  />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon style={{ minWidth: '2.5rem' }}>{<RemoveCircleOutlineRoundedIcon className={classes.popoverBtn} />}</ListItemIcon>
                    <ListItemText primary='Уменьшить' className={classes.popoverBtnDesk} />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon style={{ minWidth: '2.5rem' }}>{<CreateOutlinedIcon className={classes.popoverBtn} />}</ListItemIcon>
                    <ListItemText primary='Редактировать' className={classes.popoverBtnDesk} />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon style={{ minWidth: '2.5rem' }}>{<DeleteOutlineOutlinedIcon className={classes.popoverBtn} />}</ListItemIcon>
                    <ListItemText primary='Удалить' className={classes.popoverBtnDesk} />
                  </ListItem>
                </List>
              </Popover>
            </ListItem>
          ))
        }
        <ListItem>
          <TodoItemText primary='Помидор: 10 шт' secondary='Потребуется: 1 час 15 мин' />
        </ListItem>
      </List>
    </>
  );
}
