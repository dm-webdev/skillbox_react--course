import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { AppThemeProvider } from './common/theme/AppThemeProvider';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <AppThemeProvider>
      <CssBaseline />
      <App />
    </AppThemeProvider>
  </Router>,
  document.getElementById('root')
);
