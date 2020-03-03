import React from 'react';
import { Route } from 'react-router-dom';
// import ReactGA from 'react-ga';
import { Stack, Flex } from '@chakra-ui/core';
import Authenticate from './routes/Authenticate';
import { useAuth } from './contexts/auth';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './routes/Welcome';
import Dashboard from './routes/Dashboard';

function App() {
  const { googleApi } = useAuth();

  // function initializeAnalytics() {
  //   ReactGA.initialize('UA-157827018-1');
  //   ReactGA.pageview('/home');
  // }

  if (googleApi.isLoading) {
    return (
      <Flex
        pos="absolute"
        top={0}
        left={0}
        align="center"
        justify="center"
        w="100%"
        h="100%"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <path
            fill="#F0EB70"
            d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </Flex>
    );
  }

function App() {
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
  );
}

export default App;
