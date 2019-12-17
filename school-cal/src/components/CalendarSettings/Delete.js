import React, { useState } from "react"
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  deleteButton: {
    backgroundColor: "#F5945B",
    padding: theme.spacing(1, 3),
    borderRadius: "5px",
    border: "2px solid #F5945B",
    marginLeft: "8px"
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1, 3),
    border: "2px solid #F5945B",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "#F5945B"
  },
  buttonLabel: {
    textTransform: "none"
  }
}))
const DeleteCalendar = ({ calendar, deleteUserCalendar }) => {
  const classes = useStyles()

  const [confirmationDialog, openConfirmationDialog] = useState(false)

  const handleCloseDialog = () => {
    openConfirmationDialog(false)
  }

  const handleDeleteUserCalendar = () => {
    deleteUserCalendar(calendar.uuid)
    openConfirmationDialog(false)
  }

  const handleDeletePrimaryCalendar = () => {
    return (
      <CardContent>
        <Typography gutterBottom={true}>
          Your primary calendar cannot be deleted.
        </Typography>
      </CardContent>
    )
  }

  return (
    <div>
      <Card>
        <CardHeader title="Delete" titleTypographyProps={{ variant: "h6" }} />
        {calendar.calendarName === "Primary" ? (
          handleDeletePrimaryCalendar()
        ) : (
          <div>
            <CardContent>
              <Typography gutterBottom={true}>
                <strong>WARNING: </strong>When you delete a calendar, it's also
                deleted all events associated with the calendar. Subscribers to
                the calendar will no longer have access to it.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                classes={{
                  root: classes.deleteButton,
                  label: classes.buttonLabel
                }}
                onClick={() => openConfirmationDialog(true)}>
                Delete Calendar
              </Button>
            </CardActions>
          </div>
        )}
      </Card>
      <ConfirmationDialog
        open={confirmationDialog}
        handleClose={handleCloseDialog}
        calendar={calendar}
        deleteCalendar={handleDeleteUserCalendar}
      />
    </div>
  )
}

const ConfirmationDialog = ({
  open,
  calendar,
  handleClose,
  deleteCalendar
}) => {
  const classes = useStyles()
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Calendar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete&nbsp;
            <strong>{calendar.calendarName}</strong> calendar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={deleteCalendar}
            classes={{
              root: classes.deleteButton,
              label: classes.buttonLabel
            }}>
            Delete
          </Button>
          <Button
            onClick={handleClose}
            classes={{
              root: classes.cancelButton,
              label: classes.buttonLabel
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default DeleteCalendar
