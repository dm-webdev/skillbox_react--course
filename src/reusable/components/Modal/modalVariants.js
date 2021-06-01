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
