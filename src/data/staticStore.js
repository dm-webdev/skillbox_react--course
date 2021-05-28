const store = {
  todoList: {
    1 :{
      id: 1,
      title: 'Сверстать сайт',
      done: false,
      tomatoCount: 3,
      category: 'Работа',
      order: 2,
    },
    29: {
      id: 29,
      title: 'Проверить валидность',
      done: false,
      tomatoCount: 3,
      category: 'Работа',
      order: 1,
    },
    3: {
      id: 3,
      title: 'Выучить 100 английских слов',
      done: false,
      tomatoCount: 3,
      category: 'Учеба',
      order: 3,
    },
    4: {
      id: 26,
      title: 'Выучить стихотворение Пушкина',
      done: false,
      tomatoCount: 3,
      category: 'Учеба',
      order: 4,
    }
  },
  settings: {
    theme: 'light',
    durationOfPomodoro: 25,
    durationOfShotPause: 5,
    frequencyOfLongPauses: 3,
    durationOfLongPause: 15,
    isMessage: true,
    userName: 'Вася',
    categoriesName: [
      'Учеба',
      'Работа',
    ],
  },
  statistics: {

  },
};

export default store;
