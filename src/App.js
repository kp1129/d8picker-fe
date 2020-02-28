import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
// import ReactGA from 'react-ga';
import Splash from './components/Splash/';
import Home from './components/Home/';
import PrivateRoute from './components/PrivateRoute';
import Authenticate from './components/Authenticate';
import Events from './components/Events';
import useGapi from './hooks/useGapi';
import calendarApi from './gapi/calendarApi';

import './App.css';

function App() {
  const [eventsApi, setEventsApi] = useState();

  const onGapiLoaded = gapiClient => setEventsApi(calendarApi(gapiClient));

  // function initializeAnalytics() {
  //   ReactGA.initialize('UA-157827018-1');
  //   ReactGA.pageview('/home');
  // }

  const googleApi = useGapi({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/calendar.events',
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    ],
    ux_mode: 'redirect',
    redirect_uri: 'http://localhost:3000/authenticate/google',
    onLoaded: onGapiLoaded
  });

  const {
    isLoading,
    isAuthenticated,
    currentUser,
    onSignIn,
    onSignOut
  } = googleApi;

  useEffect(() => {
    isAuthenticated
      ? localStorage.setItem('isAuthenticated', true)
      : localStorage.removeItem('isAuthenticated');
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Initializing...</div>;
  }

  if (!isAuthenticated) {
    return <button onClick={onSignIn}>Signin with Google</button>;
  }

  return (
    <div className="App">
      <h2>Email: {currentUser && currentUser.email}</h2>
      <h2>Google ID: {currentUser && currentUser.googleId}</h2>
      <button onClick={onSignOut}>Sign out</button>
      <Route exact path="/">
        <Splash auth={{ onSignIn, onSignOut }} />
      </Route>
      <Route path="/authenticate/google">
        <Authenticate />
      </Route>

      <PrivateRoute path="/home">
        <Home profile={currentUser} eventsApi={eventsApi} />
      </PrivateRoute>

      <Route path="/events">
        <Events eventsApi={eventsApi} />
      </Route>

      {/* <PrivateRoute path="/events">
        <Events eventsApi={eventsApi} />
      </PrivateRoute> */}
    </div>
  );
}

export default App;
