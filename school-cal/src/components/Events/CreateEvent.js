/* eslint-disable */

import React, { useContext, useState } from "react"
import moment from "moment"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"

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
} from "@material-ui/core"
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import { makeStyles } from "@material-ui/core/styles"

const CreateEvent = ({ open, handleClose }) => {
  const {
    isLoading,
    createUserCalendarEvent,
    userCalendar,
    userCalendarEvent,
  } = useContext(CalendarContext)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={userCalendarEvent}
        onSubmit={async (values, actions) => {
          values.startDate = moment(values.startTime).format("YYYY-MM-DD")
          values.endDate = moment(values.endTime).format("YYYY-MM-DD")
          values.startTime = moment(values.startTime).toISOString()
          values.endTime = moment(values.endTime).toISOString()

          createUserCalendarEvent(userCalendar.uuid, values)
          actions.resetForm()
          handleClose()
        }}
        render={formikProps => (
          <CreateEventForm
            isLoading={isLoading}
            open={open}
            {...formikProps}
            handleClose={handleClose}
          />
        )}
      />
    </>
  )
}

const useStyles = makeStyles(theme => ({
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
  noteTextField: {
    background: "#F2D2BF",
    borderRadius: "5px",
  },

  dateTextField: {
    background: "#F2D2BF",
    borderRadius: "5px",
  },
  allDayCheckBoxContainer: {
    textAlign: "center",
  },
}))

const CreateEventForm = ({
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
            Create New Event
          </DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF", borderRadius: "5px" }}
                  fullWidth
                  id="event-title"
                  label="Event Title"
                  margin="normal"
                  name="eventTitle"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.eventTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF", borderRadius: "5px" }}
                  fullWidth
                  id="event-location"
                  label="Location"
                  margin="normal"
                  name="eventLocation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.eventLocation}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs={4}>
                      <FormControl className={classes.dateTextField}>
                        <Field
                          name="startTime"
                          component={StartDateTimePickerField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.dateTextField}>
                        <Field
                          name="endTime"
                          component={EndDateTimePickerField}
                        />
                      </FormControl>
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid item xs={4} className={classes.allDayCheckBoxContainer}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isAllDayEvent"
                          checked={values.isAllDayEvent}
                          onChange={handleChange}
                        />
                      }
                      label="All Day"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.noteTextField}
                  fullWidth
                  multiline
                  rows="4"
                  id="event-note"
                  label="Note"
                  margin="normal"
                  name="eventNote"
                  onChange={handleChange}
                  value={values.eventNote}
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
                "Create Event"
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

const StartDateTimePickerField = ({ field, form }) => {
  return (
    <DateTimePicker
      label="Start Date and Time"
      clearable
      disablePast
      value={field.value}
      name={field.name}
      format="MM/DD/YY      h:mma"
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}
const EndDateTimePickerField = ({ field, form }) => {
  return (
    <DateTimePicker
      label="End Date and Time"
      clearable
      disablePast
      value={field.value}
      name={field.name}
      format="MM/DD/YY      h:mma"
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}
export default CreateEvent
