import { getISOWeek } from 'date-fns';

export const DAYS_LIST = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const DEFAULT_STATISTICS = {};

const INITIAL_WEEKLY_STATISTICS = [
  { numberOfDay: '1', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: '2', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: '3', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: '4', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: '5', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: '6', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: '7', timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
];

DEFAULT_STATISTICS[(getISOWeek(new Date()) + 1).toString()] = INITIAL_WEEKLY_STATISTICS;

const INITIAL_SETTINGS = {
  durationOfPomodoro: 25,
  durationOfShotPause: 5,
  frequencyOfLongPauses: 3,
  durationOfLongPause: 15,
  userName: 'Уважаемый пользователь',
  categories: [
    'Учеба',
    'Работа',
  ],
};

export { DEFAULT_STATISTICS, INITIAL_WEEKLY_STATISTICS, INITIAL_SETTINGS };
