import { format } from 'date-fns';

export function capitalizeFirstLetter(str) {
  if (!str) {
    return str;
  }
  return `${str[0].toUpperCase()}${str.substr(1)}`;
}

export function getNameOfDaysPeriod() {
  const currentHour = +format(new Date(), 'H');

  if (currentHour >= 6 && currentHour <= 11) {
    return 'Хоpошее утро';
  }
  if (currentHour > 11 && currentHour <= 19) {
    return 'Хоpоший день';
  }
  if (currentHour > 19 && currentHour <= 22) {
    return 'Хоpоший вечер';
  }
   return 'Хоpошая ночь';
}

export function declOfNum(time, options) {
  const numByHundred = Math.abs(time) % 100;
  const numByTen = numByHundred % 10;
  if (numByHundred > 10 && numByHundred < 20) {
    return options[2];
  }
  if (numByTen > 1 && numByTen < 5) {
    return options[1];
  }
  if (numByTen === 1) {
    return options[0];
  }
  return options[2];
}

export function getAllTime(tasks, interval) {
  if (!Object.values(tasks).length) {
    return 0;
  }
  const allMin = Object.values(tasks).reduce((sum, current) => sum + +current.tomatoCount, 0) * interval

  const hours = Math.floor(allMin / 60);
  const min = Math.trunc(allMin % 60);
  const hoursDesc = declOfNum(hours, ['час', 'часа', 'часов']);
  const minDesc = declOfNum(min, ['минута', 'минуты', 'минут']);

  return `${hours} ${hoursDesc} ${min} ${minDesc}`;
}

export function getTimeLabelForAxe(min) {
  if (!min) {
    return null;
  }

  const minLabel = `${Math.floor(min % 60)} мин`;
  const hourLabel = min / 60 >= 1 ? `${Math.floor(min / 60)} ч ` : null;
  if (hourLabel) {
    return hourLabel + minLabel
  }
  return minLabel;
}

export function getTimeLabelForPause(min) {
  if (!min) {
    return '0 м';
  }

  const minLabel = `${Math.floor(min % 60)}м`;
  const hourLabel = min / 60 >= 1 ? `${Math.floor(min / 60)}ч ` : null;
  if (hourLabel) {
    return hourLabel + minLabel
  }
  return minLabel;
}

export function getHumanTimeInterval(interval) {
  if (!interval) {
    return 0;
  }

  const hours = Math.floor(interval / 60);
  const min = Math.trunc(interval % 60);
  const hoursDesc = declOfNum(hours, ['часов', 'часов', 'часов']);
  const minDesc = declOfNum(min, ['минут', 'минут', 'минут']);
  if (hours === 0) {
    return `${min} ${minDesc}`;
  }
  return `${hours} ${hoursDesc} ${min} ${minDesc}`;
}
