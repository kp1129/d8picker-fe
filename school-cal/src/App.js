/* eslint-disable */

import React from "react";
import AppRouter from "./AppRouter";
import './App.css';
// import Login from './components/Login/index'
// import {BrowserRouter as Router , Route} from 'react-router-dom'
// import Admin from './components/AdminDashboard/DummyAdminDashboard'
// import PrivateRoute from './routes/privateRoute.js'


// function App() {
//   return ( 
//     <Router>
//     <div className="App">
//     <PrivateRoute exact path = "/admin" component ={Admin}/>  
//     <Route exact path = "/login" component = {Login}/> 
//     </div> 
//     <AppRouter />
//     </Router>
// import "./App.css";
import { AuthState } from "./contexts/auth/authState";

function App() {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
}

export default App;
