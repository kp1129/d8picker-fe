import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from './utils/theme';
import App from './App';
import { AuthProvider } from './contexts/auth';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
