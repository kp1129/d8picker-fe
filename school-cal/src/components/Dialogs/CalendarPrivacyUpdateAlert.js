import React from "react"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  changeButton: {
    backgroundColor: "#F5945B",
    padding: theme.spacing(1, 3),
    borderRadius: "5px",
    border: "2px solid #F5945B",
    marginLeft: "8px",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1, 3),
    border: "2px solid #F5945B",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "#F5945B",
  },
  buttonLabel: {
    textTransform: "none",
  },
}))

const CalendarPrivacyAlert = ({
  open,
  numberOfSubscribers,
  handleClose,
  edit,
}) => {
  const classes = useStyles()
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Calendar Privacy Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There are <strong>{numberOfSubscribers}</strong> subscribers to this
            calendar. Changing the calendar's privacy setting to private, the
            calendar will <strong>no</strong>
            &nbsp;longer be accessible to the subscribers.
          </DialogContentText>
          <DialogContentText>
            Are you sure you want to change it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={edit}
            classes={{
              root: classes.changeButton,
              label: classes.buttonLabel,
            }}>
            Change
          </Button>
          <Button
            onClick={handleClose}
            classes={{
              root: classes.cancelButton,
              label: classes.buttonLabel,
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CalendarPrivacyAlert
