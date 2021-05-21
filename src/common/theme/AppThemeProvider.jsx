import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import { getTheme } from './getTheme';
import useLocalStorage from 'react-use-localstorage';

export const AppThemeContext = React.createContext(
  {
    currentThemeName: 'lightTheme',
    setCurrentThemeName: () => {},
  }
);

export function AppThemeProvider({ children }) {
  const [currentThemeName, setCurrentThemeName] = useLocalStorage('theme', 'lightTheme');
  const currentTheme = createMuiTheme(getTheme(currentThemeName));
  const contextValue = {
    currentThemeName: currentThemeName,
    setCurrentThemeName: setCurrentThemeName,
  };

  return (
    <AppThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
    </AppThemeContext.Provider>
  );
}
