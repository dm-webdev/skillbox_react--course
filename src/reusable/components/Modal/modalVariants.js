const modalVariants = {
  errorBySettings: {
    type: 'error',
    title: 'Ошибка!',
    description: 'Для изменения настроек, исправьте ошибки!',
    needClose: true,
  },
  successBySettings: {
    type: 'success',
    title: 'Готово!',
    description: 'Ваши изменения успешно сохранены!',
    needClose: true,
  },
  successByDone: {
    type: 'success',
    title: 'Готово!',
    description: 'Задача успешно завершена!',
    needClose: true,
  },
  successByAct: {
    type: 'success',
    title: 'Внимание!',
    description: 'Пора отдохнуть!',
    needClose: true,
  },
  successByPause: {
    type: 'success',
    title: 'Внимание!',
    description: 'Пора поработать! Жми Старт!',
    needClose: true,
  },
  deleteByTaskList: {
    type: 'delete',
    title: 'Удалить задачу?',
    description: null,
    needClose: false,
  },
  editByTaskList: {
    type: 'edit',
    title: 'Редактировать задачу?',
    description: 'Введите новое название задачи.',
    needClose: false,
  },
}

export default modalVariants;
