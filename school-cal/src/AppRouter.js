import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import Registration from "./pages/Registration"
<<<<<<< HEAD
import StudentDashboard from "./components/StudentDashboard"
import AdminDashboard from "./components/AdminDashboard";

=======
import StudentDashboard from "./pages/StudentDashboard"
>>>>>>> 3608fa0e2887a33ec5e6b14ec28201ae2a081425

import AdminDashboard from "./pages/AdminDashboard"
import PrivateRoute from "./components/Routes/PrivateRoute"
const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/registration" component={Registration} />
          <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/student-dashboard" component={StudentDashboard} />
        </Switch>
      </Router>
    </>
  )
}

export default AppRouter
