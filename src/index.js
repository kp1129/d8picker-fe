import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
import {StateProvider} from './contexts/Context'
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <StateProvider>
    {/* <AuthProvider> */}
      <Router>
        <App />
      </Router>
    {/* </AuthProvider> */}
  </StateProvider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
