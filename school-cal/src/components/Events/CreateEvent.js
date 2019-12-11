/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import moment from "moment"
import { Formik, Field } from "formik"

import * as Yup from "yup"
import { CalendarContext } from "../../contexts/calendar/calendarState"

import {
  Button,
  CircularProgress,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core"
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import { makeStyles } from "@material-ui/core/styles"

const CreateEvent = ({ open, handleClose }) => {
  const {
    isLoading,
    createUserCalendarEvent,
    userCalendarEvent,
    userCalendars,
  } = useContext(CalendarContext)

  const [calendars, setCalendars] = useState([])
  useEffect(() => {
    if (userCalendars.length > 0) {
      const myCalendars = userCalendars.filter(calendar => calendar.isOwner)

      setCalendars(myCalendars)
    }
  }, [userCalendars])

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={userCalendarEvent}
        onSubmit={async (values, actions) => {
          console.log(values)
          values.startDate = moment(values.startDate).format("YYYY-MM-DD")
          values.endDate = moment(values.endDate).format("YYYY-MM-DD")
          values.startTime = values.isAllDayEvent
            ? null
            : moment(values.startDate)
                .hours(moment(values.startTime).hour())
                .minutes(moment(values.startTime).minute())
                .seconds(moment(values.startTime).second())
                .toISOString(true)
          values.endTime = values.isAllDayEvent
            ? null
            : moment(values.endDate)
                .hours(moment(values.endTime).hour())
                .minutes(moment(values.endTime).minute())
                .seconds(moment(values.endTime).second())
                .toISOString(true)

          const calendarUuid = values.calendarUuid
          delete values.calendarUuid
          createUserCalendarEvent(calendarUuid, values)
          actions.resetForm()
          handleClose()
        }}
        render={formikProps => (
          <CreateEventForm
            isLoading={isLoading}
            open={open}
            {...formikProps}
            handleClose={handleClose}
            calendars={calendars}
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
    textAlign: "left",
    margin: theme.spacing(1),
  },
  calendarSelection: {
    width: "100%",
  },
  calendarSelectionContainer: {
    margin: theme.spacing(1),
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
  calendars,
}) => {
  const [primaryCalendar, setPrimaryCalendar] = useState("")
  const isAllDayEvent = values.isAllDayEvent

  useEffect(() => {
    if (calendars.length > 0) {
      const primary = calendars.find(calendar => calendar.isDefault)
      setPrimaryCalendar(primary)
    }
  }, [calendars])
  const classes = useStyles()

  return (
    <div>
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
                    <>
                      <Grid item xs={3}>
                        <FormControl className={classes.dateTextField}>
                          <Field name="startDate" component={DatePickerField} />
                        </FormControl>
                      </Grid>
                      {!isAllDayEvent && (
                        <Grid item xs={2}>
                          <FormControl className={classes.dateTextField}>
                            <Field
                              name="startTime"
                              component={TimePickerField}
                            />
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item xs={1} style={{ textAlign: "center" }}>
                        <Typography variant="h6">to</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl className={classes.dateTextField}>
                          <Field name="endDate" component={DatePickerField} />
                        </FormControl>
                      </Grid>
                      {!isAllDayEvent && (
                        <Grid item xs={2}>
                          <FormControl className={classes.dateTextField}>
                            <Field name="endTime" component={TimePickerField} />
                          </FormControl>
                        </Grid>
                      )}
                    </>
                  </MuiPickersUtilsProvider>
                  <Grid
                    item
                    xs={12}
                    className={classes.allDayCheckBoxContainer}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isAllDayEvent"
                          checked={values.isAllDayEvent}
                          onChange={handleChange}
                        />
                      }
                      label="All Day Event"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.calendarSelectionContainer}>
                <Typography>Calendars</Typography>
                <FormControl className={classes.calendarSelection}>
                  <Select
                    name="calendarUuid"
                    onChange={handleChange}
                    value={
                      values.calendarUuid
                        ? values.calendarUuid
                        : primaryCalendar.uuid
                    }>
                    {calendars.length > 0 &&
                      calendars.map(calendar => (
                        <MenuItem
                          value={calendar.uuid}
                          key={calendar.uuid}
                          style={{ color: calendar.calendarColor }}>
                          {calendar.calendarName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
    </div>
  )
}
const DatePickerField = ({ field, form }) => {
  return (
    <DatePicker
      clearable
      value={field.value}
      name={field.name}
      format="MM/DD/YYYY"
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}
const TimePickerField = ({ field, form }) => {
  return (
    <TimePicker
      clearable
      value={field.value}
      name={field.name}
      format="h:mma"
      onChange={selectedTime =>
        form.setFieldValue(field.name, selectedTime, false)
      }
    />
  )
}
export default CreateEvent
