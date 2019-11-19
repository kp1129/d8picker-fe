/* eslint-disable */

import React, { useContext, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { AuthContext } from "../../contexts/auth/authState"
import { Formik } from "formik"
import RegistrationForm from "./RegistrationForm"
import * as Yup from "yup"
import { makeStyles } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import SigninNavbar from "../../components/Navbar/signinnav"
import ReactGA from "react-ga"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
}))

const Registration = ({ history }) => {
  ReactGA.pageview(window.location.pathname + window.location.search)
  const {
    accessToken,
    isLoading,
    signUpError,
    signUpUser,
    signInWithGoogle,
  } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    if (accessToken) {
      history.push("/admin-dashboard")
    }
  }, [accessToken])

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be greater than 2 characters.")
      .max(50, "First name must be lesser 50 characters.")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "Last name must be between 2 and 50 characters.")
      .max(50, "Last name must be between 2 and 50 characters.")
      .required("Last name is required."),
    username: Yup.string()
      .min(6, "Username must be between 6 and 36 characters ")
      .max(50, "Last name must be between 2 and 50 characters.")
      .required("Username is required."),
    email: Yup.string()
      .email("Invalid email.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(32, "Password must be less than 32 characters.")
      .required("Password is required."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match.")
      .required("Password confirmation is required."),
  })

  return (
    <>
      <div className={classes.root}>
        <SigninNavbar />
        <CssBaseline />
        <Grid container>
          <Grid item md={6} style={{ background: "#A35629" }}></Grid>
          <Grid item md={6}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                passwordConfirmation: "",
              }}
              onSubmit={(values, actions) => {
                ReactGA.event({
                  category: "Register",
                  action: "New User Signed Up",
                })
                signUpUser(values)
                actions.resetForm()
              }}
              render={formikProps => (
                <RegistrationForm
                  {...formikProps}
                  isLoading={isLoading}
                  signUpError={signUpError}
                  signInWithGoogle={signInWithGoogle}
                />
              )}
              validationSchema={RegistrationSchema}
            />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Registration
