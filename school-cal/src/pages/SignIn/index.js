import React, { useContext, useState, useEffect } from "react"
import { CssBaseline, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import AdminLoginForm from "./SignInForm"
import { AuthContext } from "../../contexts/auth/authState"
import { Formik } from "formik"
import * as Yup from "yup"
import desktopCalendarImg from "../../assets/images/desktop_calendar.jpg"
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
  const {
    currentUser,
    isLoading,
    signInError,
    signInWithEmailAndPassword,
    signInWithGoogle,
  } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    if (currentUser) {
      history.push("/admin-dashboard")
    }
  }, [currentUser])

  const AdminLoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be greater 6 characters.")
      .required("Password is required."),
  })

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6}>
          <img
            className={classes.image}
            src={desktopCalendarImg}
            alt={"desktopCalendar"}
          />
        </Grid>
        <Grid item md={6}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              signInWithEmailAndPassword(values)
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
