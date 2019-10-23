import React, { useState } from "react"
import { Formik } from "formik"
import * as Yup from "yup"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core"
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
const AddEvent = ({ open, handleClose }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              selectedDate: new Date(),
              name: "",
              description: "",
              location: "",
            }}
            onSubmit={(values, actions) => {}}
            render={formikProps => <AddEventForm {...formikProps} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const AddEventForm = ({ values, handleChange, handleSubmit, handleBlur }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/DD/YYYY"
                    id="event-date"
                    label="Event Date"
                    name="eventDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.selectedDate}
                    variant="inline"
                  />
                </Grid>
                <Grid item xs={6}>
                  <KeyboardTimePicker
                    id="event-time"
                    label="Event Time"
                    name="eventTime"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.selectedDate}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="event-name"
              label="Name"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="event-description"
              label="Description"
              margin="normal"
              name="description"
              onChange={handleChange}
              value={values.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="event-location"
              label="Location"
              margin="normal"
              name="location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
            />
          </Grid>
        </Grid>
      </form>
    </>
  )
}
export default AddEvent
