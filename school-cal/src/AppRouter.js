/* eslint-disable */

import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import StudentRegister from "./components/StudentRegister"
import StudentLogin from "./components/StudentLogin"
import Registration from "./pages/Registration"
import StudentDashboard from "./components/StudentDashboard"
import AdminDashboard from "./components/AdminDashboard";


const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/student-register" component={StudentRegister} />
          <Route path="/student-signin" component={StudentLogin} />
          <Route path="/registration" component={Registration} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/student-dashboard" component={StudentDashboard} />
        </Switch>
      </Router>
    </>
  )
}

export default AppRouter
