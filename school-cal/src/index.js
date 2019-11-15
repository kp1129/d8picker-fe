/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-151752163-1');

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root'));

