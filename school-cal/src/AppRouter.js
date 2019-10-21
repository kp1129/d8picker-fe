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
const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/admin-signin" component={AdminLogin} />
          <Route path="/student-register" component={StudentRegister} />
          <Route path="/student-signin" component={StudentLogin} />
           {/* <Route path="/registration" component={Registration} /> */}
          <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
          {/* <Route path="/student-dashboard" component={StudentDashboard} /> */}
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
