import React, { useContext, useEffect, useState } from "react"
import queryString from "query-string"
import SignInForm from "../../components/SignIn"
import RegistrationForm from "../../components/Registration"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Link,
  Typography,
  Snackbar,
  SnackbarContent
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  actions: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    textTransform: "none"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  closeIcon: {
    color: "white",
    fontSize: 20
  }
}))

const Subscribe = props => {
  const classes = useStyles()

  const { accessToken, signInError, resetSignInError } = useContext(AuthContext)
  const [signInErrorDisplay, openSignInErrorDisplay] = useState(false)
  const { setCalendarSubscriptionId } = useContext(CalendarContext)

  useEffect(() => {
    if (accessToken) {
      props.history.push("/admin-dashboard")
    }
  }, [accessToken])

  useEffect(() => {
    const values = queryString.parse(props.location.search)
    if (values && values.id) {
      setCalendarSubscriptionId(values.id)
    }
  }, [props.location.search])

  useEffect(() => {
    if (signInError) {
      openSignInErrorDisplay(true)
    } else {
      openSignInErrorDisplay(false)
    }
  }, [signInError])

  const [signIn, showSignIn] = useState(true)

  const handleFormChange = event => {
    event.preventDefault()
    showSignIn(!signIn)
  }

  const handleSignInErrorDisplayClose = () => {
    resetSignInError()
  }

  return (
    <div>
      <Dialog open={true}>
        <DialogContent>
          {signIn ? (
            <SignInForm path={props.history.location} />
          ) : (
            <RegistrationForm path={props.history.location} />
          )}
        </DialogContent>
        <DialogActions className={classes.actions}>
          {signIn ? (
            <Typography>
              Do not have an account? &nbsp;
              <Link href="#" onClick={handleFormChange}>
                Register
              </Link>
            </Typography>
          ) : (
            <Typography>
              Already has an account? &nbsp;
              <Link href="#" onClick={handleFormChange}>
                Sign In
              </Link>
            </Typography>
          )}
        </DialogActions>
      </Dialog>
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

export default Subscribe
