import React from "react";
import { Route } from "react-router-dom";

import Splash from "./components/Splash/Splash";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Splash />
      </Route>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
    </div>
  );
}

export default App;
