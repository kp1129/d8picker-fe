import React from 'react';
import { Route } from 'react-router-dom';

import Splash from './components/Splash/';
import Home from './components/Home/';
// import PrivateRoute from "./components/PrivateRoute";
import Redirect from './components/Redirect';
import Events from './components/Home/Events';


import './App.css';

function App() {
	return (
		<div className='App'>
			<Route exact path='/'>
				<Splash />
			</Route>
			{/* Remember to change back to private */}
			{/* <PrivateRoute path="/home">
        <Home />
      </PrivateRoute> */}
			
			<Route path='/events'>
				<Events />
			</Route>
			<Route path='/redirect'>
				<Redirect />
			</Route>
			<Route path='/home'>
				<Home />
			</Route>
		</div>
	);
}

export default App;
