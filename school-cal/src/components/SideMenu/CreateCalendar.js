import React, { useContext } from "react"
import { Formik, Field } from "formik"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import * as Yup from "yup"
import {
  Button,
  CircularProgress,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const CreateCalendar = ({ open, handleClose }) => {
  const { isLoading } = useContext(CalendarContext)
  return (
    <div>
      <Formik
        initialValues={{
          calendarName: "",
          calendarDescription: "",
          isPrivate: true,
        }}
        onSubmit={(values, actions) => {}}
        render={formikProps => (
          <CreateCalendarForm
            isLoading={isLoading}
            open={open}
            {...formikProps}
            handleClose={handleClose}
          />
        )}
      />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  inputLabel: {
    marginLeft: theme.spacing(1),
  },
  createButton: {
    backgroundColor: "#F5945B",
    padding: theme.spacing(1, 3),
    borderRadius: "5px",
    border: "2px solid #F5945B",
  },
  buttonLabel: {
    textTransform: "none",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1, 3),
    border: "2px solid #F5945B",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "#F5945B",
  },
}))

const CreateCalendarForm = ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  handleClose,
  open,
  isLoading,
}) => {
  const classes = useStyles()
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{ background: "#21242C", color: "white" }}>
            Create New Calendar
          </DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF", borderRadius: "5px" }}
                  fullWidth
                  id="calendar-name"
                  label="Calendar Name"
                  margin="normal"
                  name="calendarName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.calendarName}
                  InputLabelProps={{ className: classes.inputLabel }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF", borderRadius: "5px" }}
                  fullWidth
                  id="calendar-description"
                  label="Calendar Description"
                  margin="normal"
                  name="calendarDescription"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.calendarDescription}
                  InputLabelProps={{ className: classes.inputLabel }}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Typography>
                  Making this calendar public allows it to be subscribed from
                  other persons. Otherwise, this calendar is a private calendar
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isPrivate"
                      checked={!values.isPrivate}
                      onChange={handleChange}
                    />
                  }
                  label="Public Calendar"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              classes={{
                root: classes.createButton,
                label: classes.buttonLabel,
              }}
              type="submit">
              {!isLoading ? (
                "Create Calendar"
              ) : (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <Button
              classes={{
                root: classes.cancelButton,
                label: classes.buttonLabel,
              }}
              onClick={handleClose}
              type="button">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
export default CreateCalendar
