import React, {useState, useContext, useEffect} from 'react';
import { Route } from 'react-router-dom';

// import ReactGA from 'react-ga';

import { Stack } from '@chakra-ui/core';
import Authenticate from './components/Authenticate';
import { useAuth } from './contexts/auth';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboardComponents/Dashboard';
import Loading from './components/Loading';

// function initializeAnalytics() {
//   ReactGA.initialize('UA-157827018-1');
//   ReactGA.pageview('/home');
// }

function App() {
  const { googleApi } = useAuth();
 
  const [userState, setUserState] = useState({})
  let currentUser = googleApi.currentUser
  useEffect(()=>{
    setUserState(currentUser)
  },[currentUser])

  if (googleApi.isLoading) {
    return <Loading />;
  }

  if (googleApi.currentUser){
    return (
      <Stack pos="relative" w="100%" minHeight="100vh">
        <Header userState={userState} />
        <Route path="/">
          <Authenticate />
        </Route>
        {googleApi.currentUser && <Route exact path="/">
          <Welcome />
        </Route>}
        <PrivateRoute path="/:id/dashboard">
          <Dashboard setUserState={setUserState}/>
        </PrivateRoute>
      </Stack>
    );
  } else {
    return (
      <Stack pos="relative" w="100%" minHeight="100vh">
        <Header />
        <Route path="/authenticate/google">
          <Authenticate />
        </Route>
        <Route exact path="/">
          <Welcome />
        </Route>
        <PrivateRoute path="/:id/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Stack>

    )
  }
}

export default App;
