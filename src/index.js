import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from './utils/theme';
import App from './App';
import { AuthProvider } from './contexts/auth';
import {createBrowserHistory} from 'history';

ReactGA.initialize("UA-157827018-1")
const  history = createBrowserHistory();
history.listen(location =>{
  ReactGA.set({page: location.pathname});
  ReactGA.pageview(location.pathname);
});



ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ThemeProvider>
      </Router>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
