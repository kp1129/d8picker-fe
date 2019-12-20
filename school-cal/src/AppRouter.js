/* eslint-disable */

import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { CalendarState } from "./contexts/calendar/calendarState"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import theme from "./utilities/theme"
import SignIn from "./pages/SignIn"
import Registration from "./pages/Registration"
import CalendarSettings from "./pages/CalendarSettings"
import Subscribe from "./pages/Subscribe"
import Marketing from "./pages/marketing/index"

import AdminDashboard from "./pages/AdminDashboard"

import PrivateRoute from "./components/Routes/PrivateRoute"
import { Theme } from "@fullcalendar/core"

const customTheme = createMuiTheme(theme)
const AppRouter = () => {
  return (
    <>
      <MuiThemeProvider theme={customTheme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/register" component={Registration} />
            <CalendarState>
              <Route path="/subscribe" component={Subscribe} />
              <PrivateRoute
                path="/admin-dashboard"
                component={AdminDashboard}
              />
              <PrivateRoute
                path="/calendar-settings/:cal_uuid"
                component={CalendarSettings}
              />
            </CalendarState>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  )
}

export default AppRouter
