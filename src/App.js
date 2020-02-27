import React from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import Splash from './components/Splash/';
import Home from './components/Home/';
import PrivateRoute from "./components/PrivateRoute";
import Authenticate from './components/Authenticate';
import Events from './components/Events';
import ReactGA from 'react-ga';
import './App.css';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();
history.listem(location => {
  ReactGA.set({ page: location.pathname});
  ReactGA.pageview(location.pathname);
});
const trackingId = "UA-157827018-1"; 
ReactGA.initialize(trackingId);
ReactGA.set({
  userId: auth.currentUserId(),
})

function App() {
  return (
    <div className="App">
      <Router history={history}>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route path="/authenticate/google">
        <Authenticate />
      </Route>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
      <PrivateRoute path="/events">
        <Events />
      </PrivateRoute>
    </div>
  );
}

export default App;
