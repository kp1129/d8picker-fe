import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Divider } from "@material-ui/core";
 import {Link as RouterLink} from "react-router-dom"
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
  );
};

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signInWithGoogle: {
    margin: theme.spacing(2, 0, 2)
  },

  progress: {
    margin: theme.spacing(1),
    color: "white"
  }
}));
const StudentRegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  signInWithGoogle,
  isLoading,
  signUpError
}) => {
  const classes = useStyles();

  const [fireBaseError, setFireBaseError] = useState(null);

  useEffect(() => {
    if (signUpError) {
      if (signUpError.code === "auth/email-already-in-use") {
        setFireBaseError("The email is already registered.");
      }
    }
  }, [signUpError]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
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
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  helperText={touched.phone ? errors.phone : ""}
                  error={touched.phone && Boolean(errors.phone)}
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
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
              className={classes.submit}
            >
              {!isLoading ? (
                "Sign Up"
              ) : (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <Divider />
            <Button
              className={classes.signInWithGoogle}
              color="primary"
              fullWidth
              onClick={signInWithGoogle}
              type="button"
              variant="contained"
            >
              Sign In With Google
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link variant="body2">
                    <RouterLink to="/student-signin">  Already have an account? Sign in</RouterLink>
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item>
              <Link variant="body2">
                    <RouterLink to="/admin-register">Not a student?</RouterLink>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>{copyRight}</Box>
      </Container>
    </>
  );
};

export default StudentRegisterForm;
