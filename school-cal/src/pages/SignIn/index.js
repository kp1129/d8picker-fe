/* eslint-disable */
import ReactGA from "react-ga"
import React, { useContext, useEffect, useState } from "react"
import { Grid, IconButton, Snackbar, SnackbarContent } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { makeStyles } from "@material-ui/core"
import SignInForm from "../../components/SignIn"
import { AuthContext } from "../../contexts/auth/authState"
import SignNavbar from "../../components/Navbar/signinnav"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  image: {
    width: "100%",
    height: "100%"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  closeIcon: {
    color: "white",
    fontSize: 20
  }
}))

const SignIn = ({ history }) => {
  ReactGA.pageview(window.location.pathname + window.location.search)
  const { accessToken, signInError, resetSignInError } = useContext(AuthContext)
  const [signInErrorDisplay, openSignInErrorDisplay] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (accessToken) {
      history.push("/admin-dashboard")
    }
  }, [accessToken])

  useEffect(() => {
    if (signInError) {
      openSignInErrorDisplay(true)
    } else {
      openSignInErrorDisplay(false)
    }
  }, [signInError])

  const handleSignInErrorDisplayClose = () => {
    resetSignInError()
  }

  return (
    <div className={classes.root}>
      <SignNavbar />
      <Grid container>
        <Grid item md={6} style={{ background: "#A35629" }}></Grid>
        <Grid item md={6}>
          <SignInForm path={history.location} />
        </Grid>
      </Grid>
      <Snackbar
        open={signInErrorDisplay}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleSignInErrorDisplayClose}>
        <SnackbarContent
          className={classes.error}
          message={"invalid credential"}
          action={
            <IconButton onClick={handleSignInErrorDisplayClose}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  )
}

export default SignIn
