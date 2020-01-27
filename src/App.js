import React from 'react';
import { Route } from 'react-router-dom';

import Splash from './components/Splash'
import Home from './components/Home'

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Splash} />
      <Route
        path="/home"
        render={() => <Home />}
        />
    </div>
  );
}

export default App;
