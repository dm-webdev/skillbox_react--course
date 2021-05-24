const store = {
  todoList: [
    {
      id: 1,
      title: 'Сверстать сайт',
      done: false,
      tomatoCount: 3,
      category: 'Работа',
    },
    {
      id: 26,
      title: 'Проверить валидность',
      done: false,
      tomatoCount: 3,
      category: 'Работа',
    },
    {
      id: 3,
      title: 'Выучить 100 английских слов',
      done: false,
      tomatoCount: 3,
      category: 'Учеба',
    },
    {
      id: 26,
      title: 'Выучить стихотворение Пушкина',
      done: false,
      tomatoCount: 3,
      category: 'Учеба',
    }
  ],
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
