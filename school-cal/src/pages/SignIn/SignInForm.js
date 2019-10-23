import React, { useEffect, useState } from "react"
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"

const copyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        School Calendar
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInWithGoogle: {
    margin: theme.spacing(2, 0, 2),
  },
  progress: {
    margin: theme.spacing(1),
    color: "white",
  },
  link: {
    textAlign: "center",
  },
}))

const SignInForm = ({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  signInWithGoogle,
  isLoading,
  signInError,
  errors,
  touched,
}) => {
  const classes = useStyles()

  const [fireBaseError, setFireBaseError] = useState(null)
  useEffect(() => {
    if (signInError) {
      if (signInError.code === "auth/invalid-email") {
        setFireBaseError("The email is not valid.")
      } else if (signInError.code === "auth/user-not-found") {
        setFireBaseError("The email is not registered. ")
      } else if (signInError.code === "auth/wrong-password") {
        setFireBaseError("The password is not valid. ")
      }
    }
  }, [signInError])
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}>
        <Grid item xs={12} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                />
              </Grid>
            </Grid>
            {fireBaseError && <Box my={4}>{fireBaseError}</Box>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {!isLoading ? (
                "Sign In"
              ) : (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <div className={classes.link}>
              <Link href="/registration" variant="body2">
                Don't have an account? Register
              </Link>
            </div>

            <Divider />
            <Button
              className={classes.signInWithGoogle}
              color="primary"
              fullWidth
              onClick={signInWithGoogle}
              type="button"
              variant="contained">
              Sign In With Google
            </Button>
          </form>
          <Box mt={5}>{copyRight}</Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SignInForm
