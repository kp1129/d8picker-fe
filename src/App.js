import React from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import Splash from './components/Splash/';
import Home from './components/Home/';
// import PrivateRoute from "./components/PrivateRoute";
import Authenticate from './components/Authenticate';
import Events from './components/Events';

import './App.css';


function App() {
  
  function initializeAnalytics() {
    ReactGA.initialize('UA-157827018-1');
    ReactGA.pageview('/home');
  }

  return (
    <div className="App">
      <Route exact path="/">
        <Splash />
      </Route>
      {/* Remember to change back to private */}
      {/* <PrivateRoute path="/home">
        <Home />
      </PrivateRoute> */}
      <Route path="/authenticate/google">
        <Authenticate />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
    </div>
  );
}

export default App;
