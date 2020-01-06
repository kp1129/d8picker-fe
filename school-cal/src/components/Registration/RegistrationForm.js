/* eslint-disable */

import React, { useEffect } from "react"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  TextField,
  Typography
} from "@material-ui/core"
import signInWithGoogleBtn from "../../assets/images/btn_google_signin_dark_focus_web.png"
const copyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        School Calendar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    padding: "0 20px",
    marginTop: theme.spacing(3)
  },
  formControl: {
    minWidth: 160
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signInWithGoogleBtnContainer: {
    margin: theme.spacing(2, 0, 2),
    display: "flex",
    width: "100%",
    justifyContent: "center"
  },

  progress: {
    margin: theme.spacing(1),
    color: "white"
  },
  link: {
    textAlign: "center"
  }
}))
const RegistrationForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  signInWithGoogle,
  isLoading,
  signUpError,
  path
}) => {
  const classes = useStyles()

  useEffect(() => {
    if (signUpError) {
      if (signUpError.code === "auth/email-already-in-use") {
      }
    }
  }, [signUpError])

  const currentPage = path.pathname

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={currentPage === "/register" ? { minHeight: "100vh" } : null}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  autoComplete="firstName"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="First Name"
                  type="text"
                  helperText={touched.firstName ? errors.firstName : ""}
                  error={touched.firstName && Boolean(errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  type="text"
                  helperText={touched.lastName ? errors.lastName : ""}
                  error={touched.lastName && Boolean(errors.lastName)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-username"
                  helperText={touched.username ? errors.username : ""}
                  error={touched.username && Boolean(errors.username)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  id="password-confirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="confirm-password"
                  helperText={
                    touched.passwordConfirmation
                      ? errors.passwordConfirmation
                      : ""
                  }
                  error={
                    touched.passwordConfirmation &&
                    Boolean(errors.passwordConfirmation)
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={12}>
              <Button
                style={{ background: "#F5945B", color: "#21242C" }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                {!isLoading ? (
                  "Sign Up"
                ) : (
                  <CircularProgress className={classes.progress} size={30} />
                )}
              </Button>
              {currentPage === "/register" ? (
                <div className={classes.link}>
                  <Link href="/sign-in">Already has an account ? Sign In</Link>
                </div>
              ) : null}

              <Divider />
              <div className={classes.signInWithGoogleBtnContainer}>
                <Button onClick={signInWithGoogle} type="button">
                  <img src={signInWithGoogleBtn} className={classes.imageSrc} />
                </Button>
              </div>
            </Grid>
          </form>

          {/* <Box mt={5}>{copyRight}</Box> */}
        </div>
      </Grid>
    </>
  )
}

export default RegistrationForm
