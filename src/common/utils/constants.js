import { getISOWeek } from 'date-fns';

export const DAYS_LIST = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const DEFAULT_STATISTICS = {};

DEFAULT_STATISTICS[getISOWeek(new Date()) + 1] = [
  { numberOfDay: 1, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: 2, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: 3, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: 4, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: 5, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: 6, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
  { numberOfDay: 7, timerUsageTime: 0, finishedTomatoesTime: 0, pauseTime: 0, stopCount: 0, pomodoroCount: 0 },
];

export { DEFAULT_STATISTICS };
