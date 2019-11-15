/* eslint-disable */
import ReactGA from 'react-ga';
import React, { useContext, useState, useEffect } from "react"
import { CssBaseline, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import AdminLoginForm from "./SignInForm"
import { AuthContext } from "../../contexts/auth/authState"
import { Formik } from "formik"
import * as Yup from "yup"
import SignNavbar from "../../components/Navbar/signinnav"
import desktopCalendarImg from "../../assets/images/desktop_calendar.jpg"
import ReactGA from 'react-ga';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
}))

const SignIn = ({ history }) => {
   ReactGA.pageview(window.location.pathname + window.location.search);
  const {
    currentUser,
    isLoading,
    signInError,
    signInWithUserIdAndPassword,
    signInWithGoogle,
  } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    if (currentUser) {
      history.push("/admin-dashboard")
    }
  }, [currentUser])

  const AdminLoginSchema = Yup.object().shape({
    userId: Yup.string().required("User ID is required."),
    password: Yup.string()
      .min(6, "Password must be greater 6 characters.")
      .required("Password is required."),
  })

  return (
    <div className={classes.root}>
      <SignNavbar />
      <Grid container>
        <Grid item md={6} style={{background: "#A35629"}}>
          {/* <img
            className={classes.image}
            src={desktopCalendarImg}
            alt={"desktopCalendar"}
          /> */}
        </Grid>
        <Grid item md={6}>
          <Formik 
            initialValues={{ userId: "", password: "" }}
            onSubmit={(values, actions) => {
                ReactGA.event({
                  category: 'Sign In',
                  action: 'Existing User Signed In'
                });
              signInWithUserIdAndPassword(values)
              actions.resetForm()
            }}
            render={formikProps => (
              <AdminLoginForm
                {...formikProps}
                isLoading={isLoading}
                signInError={signInError}
                signInWithGoogle={signInWithGoogle}
              />
            )}
            validationSchema={AdminLoginSchema}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default SignIn
