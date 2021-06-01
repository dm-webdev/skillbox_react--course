import { IconButton, List, ListItem, ListItemIcon, ListItemText, Popover } from '@material-ui/core';
import { useContext, useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import todoListStyles from './todoListStyles';
import { AppModalContext } from '../Modal/AppModalProvider';
import modalVariants from '../Modal/modalVariants';
import PropTypes from 'prop-types';


export function TodoPopover({ item, setTaskUp, setTaskDown, removeTask, editTask }) {
  const { isModalOpen, modalProps, setModalProps, setModalOpen } = useContext(AppModalContext);
  const classes = todoListStyles();
  const [anchorForPopover, setAnchorForPopover] = useState(null);
  const handleOpenPopover = event => {
    setAnchorForPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorForPopover(null);
  };
  const openPopover = Boolean(anchorForPopover);

  function openModalOnDelete(ev, id) {
    ev.preventDefault();
    const  modalProps = modalVariants.deleteByTaskList;
    setModalOpen(!isModalOpen);
    setModalProps({ ...modalProps, id, removeTask });
  }

  function openModalOnEdit(ev, id, itemTitle) {
    ev.preventDefault();
    const  modalProps = modalVariants.editByTaskList;
    setModalOpen(!isModalOpen);
    setModalProps({ ...modalProps, id, itemTitle, editTask });
  }

  return (
    <>
      <IconButton
        aria-label='открыть меню редактирования задачи'
        variant='contained'
        onClick={handleOpenPopover}
      >
        <MoreHorizIcon className={classes.dotedBtn}/>
      </IconButton>

      <Popover
        key={item.id}
        open={openPopover}
        anchorEl={anchorForPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List key={item.id}>
          <ListItem
            button
            onClick={ev => {
              ev.preventDefault();
              setTaskUp(item.id);
              handleClosePopover();
            }}
          >
            <ListItemIcon style={{minWidth: '2.5rem'}}>
              <AddCircleOutlineRoundedIcon className={classes.popoverBtn}/>
            </ListItemIcon>
            <ListItemText primary='Увеличить' className={classes.popoverBtnDesk}/>
          </ListItem>

          <ListItem
            button
            onClick={ev => {
              ev.preventDefault();
              setTaskDown(item.id);
              handleClosePopover();
            }}
          >
            <ListItemIcon style={{minWidth: '2.5rem'}}>
              <RemoveCircleOutlineRoundedIcon className={classes.popoverBtn}/>
            </ListItemIcon>
            <ListItemText primary='Уменьшить' className={classes.popoverBtnDesk}/>
          </ListItem>

          <ListItem
            button
            onClick={ev => {
              openModalOnEdit(ev, item.id, item.title);
              handleClosePopover();
            }}
          >
            <ListItemIcon style={{minWidth: '2.5rem'}}>
              <CreateOutlinedIcon className={classes.popoverBtn}/>
            </ListItemIcon>
            <ListItemText primary='Редактировать' className={classes.popoverBtnDesk}/>
          </ListItem>

          <ListItem
            button
            onClick={ev => {
              openModalOnDelete(ev, item.id);
              handleClosePopover();
            }}
          >
            <ListItemIcon style={{minWidth: '2.5rem'}}>
              <DeleteOutlineOutlinedIcon className={classes.popoverBtn}/>
            </ListItemIcon>
            <ListItemText primary='Удалить' className={classes.popoverBtnDesk}/>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

TodoPopover.propTypes = {
  item: PropTypes.object.isRequired,
  setTaskUp: PropTypes.func.isRequired,
  setTaskDown: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}
