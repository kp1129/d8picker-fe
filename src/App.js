import React from "react";
import { Route } from "react-router-dom";

import Splash from "./components/Splash/";
import Home from "./components/Home/";
// import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Splash />
      </Route>
      {/* Remember to change back to private */}
      {/* <PrivateRoute path="/home">
        <Home />
      </PrivateRoute> */}
      <Route>
        <Home />
      </Route>
    </div>
  );
}

export default App;
