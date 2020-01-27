import React from 'react';
import { Route } from 'react-router-dom';

import Splash from './components/Splash'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Splash} />
    </div>
  );
}

export default App;
