/* eslint-disable */

import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { CalendarState } from "./contexts/calendar/calendarState"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import Registration from "./pages/Registration"

import Marketing from "./pages/marketing/index"

import AdminDashboard from "./pages/AdminDashboard"

import PrivateRoute from "./components/Routes/PrivateRoute"
const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/register" component={Registration} />
          <Route path="/admin-dashboard" component={AdminDashboard} />

          <Route exact path="/" component={Marketing} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/register" component={Registration} />
          <CalendarState>
            <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
          </CalendarState>
        </Switch>
      </Router>
    </>
  )
}

export default AppRouter
