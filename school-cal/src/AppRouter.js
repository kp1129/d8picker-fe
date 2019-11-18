<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import AdminLogin from "./components/AdminLogin";
import StudentRegister from "./components/StudentRegister";
import StudentLogin from "./components/StudentLogin";
// import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard/DummyAdminDashboard";
import PrivateRoute from "./routes/privateRoute";
import Navbar from './components/Navbar'
=======
/* eslint-disable */

import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import Registration from "./pages/Registration"

import AdminDashboard from "./pages/AdminDashboard"
import PrivateRoute from "./components/Routes/PrivateRoute"
>>>>>>> fa2610d21bd797057f2b467666cf89e1278e6ff0
const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
<<<<<<< HEAD
          <Route path="/admin-signin" component={AdminLogin} />
          <Route path="/student-register" component={StudentRegister} />
          <Route path="/student-signin" component={StudentLogin} />
           {/* <Route path="/registration" component={Registration} /> */}
          <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
          {/* <Route path="/student-dashboard" component={StudentDashboard} /> */}
=======
          <Route path="/sign-in" component={SignIn} />
          <Route path="/register" component={Registration} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
>>>>>>> fa2610d21bd797057f2b467666cf89e1278e6ff0
        </Switch>
      </Router>
    </>
  )
}

export default AppRouter
