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
