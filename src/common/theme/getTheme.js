import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';


const themesList = {
  lightTheme,
  darkTheme,
}

export function getTheme(theme) {
  return themesList[theme]
}
