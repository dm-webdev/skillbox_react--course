export function validateText(value, minLength, maxLength, isRequaried = true) {
  if (!value && isRequaried) {
    return 'Это поле обязательно';
  }
  const trimLen = value.trim().length;
  if (trimLen > maxLength || trimLen < minLength) {
    return 'Введите корректное значение';
  }
  return -1;
};

export function validateNumber(value, minLength, maxLength) {
  if (!value) {
    return 'Поле обязательно';
  }
  if (+value > maxLength || +value < minLength) {
    return `от ${minLength} до ${maxLength}`;
  }
  return -1;
};
