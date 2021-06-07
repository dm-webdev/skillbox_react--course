export function getFormatTime(msec) {
  const min = Math.floor(msec / 60000);
  const sec = Math.trunc((msec % 60000) / 1000);

  return `${
    new Intl.NumberFormat('ru-RU', {minimumIntegerDigits: 2}).format(min)
  }:${
    new Intl.NumberFormat('ru-RU', {minimumIntegerDigits: 2}).format(sec)
  }`
}
